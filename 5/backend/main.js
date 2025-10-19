import cors from "cors";
import express from "express";
import mongoose from "mongoose";

import { authRouter } from "./auth/authRouter.js";
import { usersRouter } from "./user/userRouter.js";
import { booksRouter } from "./book/bookRouter.js";
import { loggerMiddleware } from "./middleware/logger.js";

process.loadEnvFile(".env");

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("DB Connected successfully."))
  .catch((error) => console.error(error.message));

const app = express();

app.use(express.json());
app.use(cors());
app.use(loggerMiddleware);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/books", booksRouter);

const port = 3000;

app.listen(port, () => {
  console.log(`🚀 Server running at http://127.0.0.1:${port}`);
});
