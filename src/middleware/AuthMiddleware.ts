import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserService from "../service/UserService";

const secretKeyUser = "qualquer-chave-secreta-segura"; // ou use process.env.JWT_KEY

class AuthMiddleware {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }
  // Método para autenticar o usuário com JWT
  public authenticate(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      res.status(401).json({ message: "Autorização necessária" });
      return;
    }

    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, secretKeyUser) as {
        id: string;
        email: string;
        role: string;
      };
      // Adiciona o usuário ao request para uso posterior
      next(); // Chama o próximo middleware
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Token inválido" });
    }
  }

  // Middleware para verificar se o usuário está autenticado e tem a role adequada
  public verifyRoles(...roles: string[]) {
    return (req: Request, res: Response, next: NextFunction): void => {
      const authHeader = req.headers["authorization"];
      if (!authHeader) {
        res.status(401).json({ message: "Autorização necessária" });
        return;
      }

      const token = authHeader.split(" ")[1];
      console.log(token);
      try {
        const decoded = jwt.verify(token, secretKeyUser) as {
          id: string;
          email: string;
          role: string;
        };
        console.log(decoded);

        // Verifica se a role do usuário está entre as roles permitidas
        if (!roles.includes(decoded.role)) {
          res.status(403).json({ message: "Usuário não autorizado" });
          return;
        }
        // Adiciona o usuário ao request para uso posterior
        next(); // Chama o próximo middleware
      } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Token inválido" });
        return;
      }
    };
  }

  // Método para registrar um novo usuário
  public async register(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body;

    // Validação simples dos dados de entrada
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      res.status(400).json({ message: "Todos os campos são obrigatórios" });
      return;
    }

    // Verifica se o usuário já existe
    const existingUser = await this.userService.fetchUserByEmail(email);
    if (existingUser) {
      res.status(400).json({ message: "Email já cadastrado!" });
      return;
    }

    // Cria um novo usuário
    const newUser = await this.userService.registerUser(name, email, password);
    res.status(201).json({ ...newUser, password: undefined });
  }

  // Método para login
  public async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    // Validação simples dos dados de entrada
    if (typeof email !== "string" || typeof password !== "string") {
      res.status(400).json({ message: "Todos os campos são obrigatórios" });
      return;
    }

    // Busca o usuário pelo email
    const user = await this.userService.fetchUserByEmail(email);
    if (!user) {
      res.status(404).json({ message: "Usuário não encontrado" });
      return;
    }

    // Verifica a senha
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      res.status(404).json({ message: "Usuário não encontrado" });
      return;
    }

    // Gera o token JWT
    const payload = { id: user.id, email: user.email, role: user.roleId }; // Adicione a role aqui
    const token = jwt.sign(payload, process.env.JWT_KEY as string);

    // Retorna o token ao usuário logado
    res.status(200).json({ message: "Usuário logado com sucesso", token });
  }
}

export default AuthMiddleware;
