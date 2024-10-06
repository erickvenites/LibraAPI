import { Books } from "@prisma/client";
import prisma from "../config/prisma";
import { v4 as uuid } from "uuid";
export interface BooksTypesRequest {
  title: string;
  author: string;
  publisher: string;
  publishedDate: Date;
  ISBN: string;
  genreId: string;
  quantityAvailable: number;
  pages: number;
  language: string;
  summary?: string;
  coverUrl?: string;
}

class BooksModel {
  public async getAllBooks(): Promise<Books[] | Error> {
    try {
      return await prisma.books.findMany();
    } catch (error: any) {
      console.error(`Error fetching all books: ${error.message}`);
      throw new Error("Error fetching all books");
    }
  }

  public async getBookById(id: string): Promise<Books | Error | null> {
    try {
      const book = await prisma.books.findUnique({ where: { id } });
      if (!book) {
        throw new Error("Book not found");
      }
      return book;
    } catch (error: any) {
      console.error(`Error fetching book by ID: ${error.message}`);
      throw new Error("Error fetching book by ID");
    }
  }

  public async createBook({
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
  }: BooksTypesRequest): Promise<Books | Error | null> {
    try {
      return await prisma.books.create({
        data: {
          id: uuid(),
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
        },
      });
    } catch (error: any) {
      console.error(`Error creating book: ${error.message}`);
      throw new Error("Error creating book");
    }
  }

  public async updateBook(
    id: string,
    updatedBook: BooksTypesRequest
  ): Promise<Books | null | Error> {
    try {
      const book = await prisma.books.findUnique({ where: { id } });
      if (!book) {
        throw new Error("Book not found");
      }

      return await prisma.books.update({
        where: { id },
        data: updatedBook,
      });
    } catch (error: any) {
      console.error(`Error updating book: ${error.message}`);
      throw new Error("Error updating book");
    }
  }

  public async deleteBook(id: string): Promise<void> {
    try {
      const book = await prisma.books.findUnique({ where: { id } });
      if (!book) {
        throw new Error("Book not found");
      }

      await prisma.books.delete({
        where: { id },
      });
    } catch (error: any) {
      console.error(`Error deleting book: ${error.message}`);
      throw new Error("Error deleting book");
    }
  }
}

export default new BooksModel();
