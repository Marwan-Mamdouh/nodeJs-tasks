import { readJson, writeJson } from "../repository/bookRepository.js";

const getAllBooks = (req, res) => {
  const books = readJson();
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(books));
};

const getBookById = (req, res) => {
  const id = parseInt(req.url.split("/")[2]);
  const book = readJson().filter((bookId) => id === bookId)[0];
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(book));
};

const createBook = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const newBook = JSON.parse(body);
    const books = readJson();
    newBook.id = books ? books[books.length - 1].id + 1 : 1;
    books.push(newBook);
    writeJson(books);
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newBook));
  });
};

const updateBook = (req, res) => {
  const id = parseInt(req.url.split("/")[2]);
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const updatedBook = JSON.parse(body);
    const books = readJson();
    const index = books.findIndex((b) => b.id === id);

    if (index !== -1) {
      books[index] = { id, ...updatedBook };
      writeJson(books);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(books[index]));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ message: "Book not found" }));
    }
  });
};

const removeBook = (req, res) => {
  const id = parseInt(req.url.split("/")[2]);
  let books = readJson();
  const newBooks = books.filter((b) => b.id !== id);

  if (books.length !== newBooks.length) {
    writeJson(newBooks);
    res.writeHead(200);
    res.end(JSON.stringify({ message: "Book deleted" }));
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ message: "Book not found" }));
  }
};

export { getAllBooks, getBookById, createBook, updateBook, removeBook };
