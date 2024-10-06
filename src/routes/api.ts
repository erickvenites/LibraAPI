import { Router } from "express";
import BooksController from "../controllers/BooksController";
import AuthMiddleware from "../middleware/AuthMiddleware";

const booksController = new BooksController();
const apiRouter = Router();
const authMiddleware = new AuthMiddleware();

// Definindo a rota para lidar com os livros
apiRouter.get(
  "/books",
  booksController.handleSearchAllBooks.bind(booksController)
);

apiRouter.get(
  "/books/:id",
  booksController.handleSearchBookById.bind(booksController)
);

// Adiciona o método de autenticação e verificação de roles para criar livro
apiRouter.post(
  "/books",
  authMiddleware.authenticate.bind(authMiddleware), // Método de autenticação corrigido
  //authMiddleware.verifyRoles("admin").bind(authMiddleware), // Verifica se o usuário tem as roles apropriadas
  booksController.handleCreateBook.bind(booksController)
);

// Adiciona o método de autenticação e verificação de roles para atualizar livro
apiRouter.put(
  "/books/:id",
  authMiddleware.authenticate.bind(authMiddleware), // Método de autenticação
  authMiddleware.verifyRoles("admin").bind(authMiddleware), // Verifica se o usuário tem as roles apropriadas
  booksController.handleUpdate.bind(booksController)
);

// Adiciona o método de autenticação e verificação de roles para deletar livro
apiRouter.delete(
  "/books/:id",
  authMiddleware.authenticate.bind(authMiddleware), // Método de autenticação
  authMiddleware.verifyRoles("admin").bind(authMiddleware), // Apenas admin pode deletar
  booksController.handleDelete.bind(booksController)
);

export default apiRouter;
