import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserService from "../service/UserService";

class AuthController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  // Método para registrar um novo usuário
  public async register(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body;

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      res.status(400).json({ message: "Todos os campos são obrigatórios" });
      return; // Retorna após enviar a resposta
    }

    const existingUser = await this.userService.fetchUserByEmail(email);
    if (existingUser) {
      res.status(400).json({ message: "Email já cadastrado!" });
      return; // Retorna após enviar a resposta
    }

    const newUser = await this.userService.registerUser(name, email, password);
    res.status(201).json({ ...newUser, password: undefined });
    return; // Retorna sem valor
  }

  // Método para login
  public async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;

    if (typeof email !== "string" || typeof password !== "string") {
      res.status(400).json({ message: "Todos os campos são obrigatórios" });
      return; // Retorna após enviar a resposta
    }

    const user = await this.userService.fetchUserByEmail(email);
    if (!user) {
      res.status(404).json({ message: "Usuário não encontrado" });
      return; // Retorna após enviar a resposta
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      res.status(401).json({ message: "Credenciais inválidas" }); // Resposta correta para senha inválida
      return; // Retorna após enviar a resposta
    }

    const payload = { id: user.id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_KEY as string);
    res.status(200).json({ message: "Usuário logado com sucesso", token });
    return; // Retorna sem valor
  }
}

export default AuthController;
