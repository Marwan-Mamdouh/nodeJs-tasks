import {
  getBooks,
  getBook,
  addBook,
  updateBooks,
  deleteBook,
} from "../controller/bookController.js";
import express from "express";

const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getBook);
router.post("/", addBook);
router.put("/:id", updateBooks);
router.delete("/:id", deleteBook);

export { router as booksRouter };
