import { Books } from "@prisma/client";
import prisma from "../config/prisma";
import { v4 as uuid } from "uuid";
export interface BooksTypesRequest {
  title: string;
  id?: string;
  author: string;
  quantityAvailable: number;
}

class BooksModel {
  public async getAllBooks(): Promise<Books[] | Error> {
    return prisma.books.findMany();
  }
  public async getBookById(id: string): Promise<Books | Error | null> {
    return prisma.books.findUnique({
      where: {
        id,
      },
    });
  }
  public async createBook({
    title,
    author,
    quantityAvailable,
  }: BooksTypesRequest): Promise<Books | Error | null> {
    return prisma.books.create({
      data: {
        id: uuid(),
        title,
        author,
        quantityAvailable,
      },
    });
  }
  public async updateBook(
    id: string,
    updatedBook: Books
  ): Promise<Books | null | Error> {
    return await prisma.books.update({
      where: { id },
      data: updatedBook,
    });
  }
  public async deleteBook(id: string): Promise<void> {
    await prisma.books.delete({
      where: { id },
    });
    return;
  }
}

export default new BooksModel();
