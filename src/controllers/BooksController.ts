import { Request, Response } from "express";
import BooksService from "../service/BooksService";
import { BooksTypesRequest } from "../models/BooksModel";

class BooksController {
  private booksService: BooksService;

  constructor() {
    this.booksService = new BooksService();
  }

  // GET /api/books
  public async handleSearchAllBooks(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const books = await this.booksService.fetchAllBooks();
      res.status(200).json(books);
    } catch (error: any) {
      console.error(`Error ao buscar livros: ${error}`);
      res.status(500).json({ message: "Error ao buscar livros" });
    }
  }

  // GET /api/books/:id
  public async handleSearchBookById(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { id } = req.params;
      const book = await this.booksService.fetchBookById(id);
      if (!book) {
        res
          .status(404)
          .json({ message: "Esse livro não existe em nossa base de dados" });
        return;
      }
      res.status(200).json(book);
    } catch (error: any) {
      console.error("Error ao buscar o livro", error);
      res.status(500).json({ message: "Error ao buscar o livro" });
    }
  }

  // POST /api/books/create-book
  public async handleCreateBook(req: Request, res: Response): Promise<void> {
    try {
      const {
        title,
        author,
        publisher,
        publishedDate,
        ISBN,
        genreId,
        quantityAvailable,
        pages,
        language,
        summary,
        coverUrl,
      } = req.body;

      // Validação básica
      if (
        typeof title !== "string" ||
        typeof author !== "string" ||
        typeof quantityAvailable !== "number"
      ) {
        res.status(400).json({ message: "Campos inválidos" });
        return;
      }

      const newBook = await this.booksService.createNewBook({
        title,
        author,
        publisher,
        publishedDate,
        ISBN,
        genreId,
        quantityAvailable,
        pages,
        language,
        summary,
        coverUrl,
      });

      res
        .status(201)
        .json({ message: "Livro adicionado com sucesso", newBook });
    } catch (error: any) {
      console.error("Error ao adicionar o livro", error);
      res.status(500).json({ message: "Error ao adicionar o livro" });
    }
  }

  // PUT /api/books/:id
  public async handleUpdate(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const {
        title,
        author,
        publisher,
        publishedDate,
        ISBN,
        genreId,
        quantityAvailable,
        pages,
        language,
        summary,
        coverUrl,
      }: BooksTypesRequest = req.body;

      const fieldsToUpdate = {
        title,
        author,
        publisher,
        publishedDate,
        ISBN,
        genreId,
        quantityAvailable,
        pages,
        language,
        summary,
        coverUrl,
      };

      const updatedBook = await this.booksService.updateBook(
        id,
        fieldsToUpdate
      );
      if (!updatedBook) {
        res.status(404).json({ message: "Esse livro não existe" });
        return;
      }

      res
        .status(200)
        .json({ message: "Livro atualizado com sucesso", updatedBook });
    } catch (error: any) {
      console.error("Error ao atualizar o livro", error);
      res.status(500).json({ message: "Error ao atualizar o livro" });
    }
  }

  // DELETE /api/books/:id
  public async handleDelete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const book = await this.booksService.fetchBookById(id);
      if (!book) {
        res
          .status(404)
          .json({ message: "Esse Livro não existe ou já foi deletado" });
        return;
      }

      await this.booksService.deleteBook(id);
      res.status(204).send();
    } catch (error: any) {
      console.error("Error ao deletar o livro", error);
      res.status(500).json({ message: "Error ao deletar o livro" });
    }
  }
}

export default BooksController;
