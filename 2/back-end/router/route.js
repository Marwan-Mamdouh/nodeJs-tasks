import {
  getAllBooks,
  createBook,
  updateBook,
  removeBook,
} from "../services/bookService.js";

const router = {
  OPTIONS: {
    "": (req, res) => {
      res.writeHead(204);
      return res.end();
    },
  },

  GET: {
    "/books/": getAllBooks,
  },

  POST: {
    "/books/": createBook,
  },

  PUT: {
    "/books/": updateBook,
  },

  DELETE: {
    "/books/": removeBook,
  },
};

export { router };
