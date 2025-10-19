import bookController from "./bookController.js";
import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.get("/", bookController.getBooks);
router.get("/:id", bookController.getBook);

router.use(authMiddleware);

router.post("/", bookController.addBook);
router.put("/:id", bookController.updateBooks);
router.delete("/:id", bookController.deleteBook);

export { router as booksRouter };
