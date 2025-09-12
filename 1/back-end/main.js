const { createServer } = require("http");
const { readJson, writeJson } = require("./fileReader");

const hostname = "127.0.0.1";
const port = 3000;

const server = createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow frontend requests
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  if (req.url === "/books" && req.method === "GET") {
    const books = readJson();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(books));
  } else if (req.url === "/books" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const newBook = JSON.parse(body);
      const books = readJson();
      newBook.id = books.length ? books[books.length - 1].id + 1 : 1;
      books.push(newBook);
      writeJson(books);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(newBook));
    });
  } else if (req.url.startsWith("/books/") && req.method === "PUT") {
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
  } else if (req.url.startsWith("/books/") && req.method === "DELETE") {
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
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(port, hostname, () => {
  console.log(`🚀 Server running at http://${hostname}:${port}/`);
});
