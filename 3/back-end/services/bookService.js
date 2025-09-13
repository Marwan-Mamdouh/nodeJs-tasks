import { readJson, writeJson } from "../repository/bookRepository.js";

function getAllBooks() {
  return readJson();
}

function getBookById(id) {
  return readJson().find((bookId) => id === bookId.id);
}

function createBook(data) {
  const books = readJson().sort((a, b) => a.id - b.id);
  data.id = books
    ? books.length - 1 < books[books.length - 1].id
      ? books[books.length - 1].id + 1
      : books.length
    : 1;
  books.push(data);
  writeJson(books);
  return data;
}

function updateBook(id, data) {
  const books = readJson();
  let updatedBook;
  const newBooks = books.map((book) => {
    if (book.id === id) {
      updatedBook = { id, ...data };
      return updatedBook;
    }
    return book;
  });
  if (updatedBook) {
    writeJson(newBooks);
    return updatedBook;
  }
  return null;
}

function removeBook(id) {
  const books = readJson();
  const index = books.findIndex((b) => b.id === id);
  if (index === -1) return false;
  books.splice(index, 1);
  writeJson(books);
  return true;
}

export { getAllBooks, getBookById, createBook, updateBook, removeBook };
