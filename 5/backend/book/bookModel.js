// models/Book.js
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    bookCoverImage: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    genre: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price must be greater than or equal to 0"],
    },
    publishedYear: {
      type: Number,
      min: [0, "Year cannot be negative"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // reference to User model
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Book", bookSchema);
