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
    return BooksModel.createBook({
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
  }
  public async updateBook(
    id: string,
    dataUpdatedBook: BooksTypesRequest
  ): Promise<Books | Error | null> {
    return BooksModel.updateBook(id, dataUpdatedBook);
  }
  public async deleteBook(id: string) {
    return BooksModel.deleteBook(id);
  }
}
export default BooksService;
