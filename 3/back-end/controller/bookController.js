import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  removeBook,
} from "../services/bookService.js";

function getBooks(req, res) {
  const books = getAllBooks();
  res.json(books);
}

export function getBook(req, res) {
  const book = getBookById(+req.params.id);
  if (!book) return res.status(404).send("Book not found");
  res.json(book);
}

export function addBook(req, res) {
  const book = createBook(req.body);
  res.status(201).json(book);
}

export function updateBooks(req, res) {
  const book = updateBook(+req.params.id, req.body);
  if (!book) return res.status(404).send("Book not found");
  res.json(book);
}

export function deleteBook(req, res) {
  const success = removeBook(+req.params.id);
  if (!success) return res.status(404).send("Book not found");
  res.send("Book deleted");
}

export { getBooks, getBook, addBook, updateBooks, deleteBook };
