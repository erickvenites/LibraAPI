import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserService from "../models/UserModel";

class AuthController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
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
      return; // Adicione um retorno aqui
    }

    // Verifica se o usuário já existe
    const existingUser = await this.userService.getUserByEmail(email); // Alterar para await
    if (existingUser) {
      res.status(400).json({ message: "Email já cadastrado!" });
      return; // Adicione um retorno aqui
    }

    // Cria um novo usuário
    const newUser = await this.userService.createUser(name, email, password); // Alterar para await

    // Remove a senha do retorno (por segurança)
    res.status(201).json({ ...newUser, password: undefined });
  }

  // Método para login
  public async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    // Validação simples dos dados de entrada
    if (typeof email !== "string" || typeof password !== "string") {
      res.status(400).json({ message: "Todos os campos são obrigatórios" });
      return; // Adicione um retorno aqui
    }

    // Busca o usuário pelo email
    const user = await this.userService.getUserByEmail(email); // Alterar para await
    if (!user) {
      res.status(404).json({ message: "Usuário não encontrado" });
      return; // Adicione um retorno aqui
    }

    // Verifica a senha
    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      res.status(404).json({ message: "Usuário não encontrado" });
      return; // Adicione um retorno aqui
    }

    // Gera o token JWT
    const payload = { id: user.id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_KEY as string);

    // Retorna o token ao usuário logado
    res.status(200).json({ message: "Usuário logado com sucesso", token });
  }
}

export default AuthController;
