import express from "express";
import cors from "cors";
import { booksRouter } from "./router/booksRouter.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/books", booksRouter);

const hostname = "127.0.0.1";
const port = 3000;

app.listen(port, () => {
  console.log(`🚀 Server running at http://${hostname}:${port}`);
});
