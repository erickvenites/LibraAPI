// Importações com ES Modules
import { Router } from "express";
import AuthController from "../controllers/AuthController";

// Inicializar o roteador do Express
const authRouter = Router();
const authController = new AuthController();
// Rotas públicas
authRouter.post("/register", authController.register.bind(authController));
authRouter.post("/login", authController.login.bind(authController));

// Exportar o roteador
export default authRouter;
