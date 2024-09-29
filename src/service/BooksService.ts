import { Books } from "@prisma/client";
import BooksModel, { BooksTypesRequest } from "../models/BooksModel";

class BooksService {
  public async fetchAllBooks(): Promise<Books[] | Error | null> {
    return BooksModel.getAllBooks();
  }
  public async fetchBookById(id: string): Promise<Books | Error | null> {
    return BooksModel.getBookById(id);
  }
  public async createNewBook({
    title,
    author,
    quantityAvailable,
  }: BooksTypesRequest): Promise<Books | Error | null> {
    return BooksModel.createBook({ title, author, quantityAvailable });
  }
  public async updateBook(
    id: string,
    dataUpdatedBook: Books
  ): Promise<Books | Error | null> {
    return BooksModel.updateBook(id, dataUpdatedBook);
  }
  public async deleteBook(id: string) {
    return BooksModel.deleteBook(id);
  }
}
export default BooksService;
