// Importações com ES Modules
import { Router } from "express";
import AuthMiddleware from "./middleware/AuthMiddleware";
import AuthController from "./controllers/AuthController";

// Inicializar o roteador do Express
const router = Router();
const authController = new AuthController();
const ensureAuth = new AuthMiddleware();
// Rotas públicas
router.post("/auth/register", authController.register.bind(authController));
router.post("/auth/login", authController.login.bind(authController));

// Exportar o roteador
export default router;
