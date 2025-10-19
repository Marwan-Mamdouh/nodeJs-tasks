import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addBookCall,
  editBookCall,
  getAllBooksCall,
  removeBookCall,
} from "../../requestHelper/axiosRequest";

export const getBooks = createAsyncThunk(
  "books/getAll",
  async () => await getAllBooksCall()
);

export const editBook = createAsyncThunk(
  "books/editById",
  async ({ id, updatedBook }) => await editBookCall(id, updatedBook)
);

export const addBook = createAsyncThunk(
  "books/addBook",
  async (body) => await addBookCall(body)
);

export const removeBook = createAsyncThunk(
  "books/removeBook",
  async (id) => await removeBookCall(id)
);

const initialState = {
  books: [],
};

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducer: {},
  extraReducers(builder) {
    builder.addCase(getBooks.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getBooks.fulfilled, (state, { payload }) => {
      state.books = payload;
    });

    builder.addCase(getBooks.rejected, (state) => {
      state.error = true;
    });

    builder.addCase(editBook.fulfilled, (state, { payload }) => {
      const index = state.books.findIndex((b) => b._id === payload._id);
      console.log(index);
      if (index !== -1) state.books[index] = payload;
    });

    builder.addCase(addBook.fulfilled, (state, { payload }) => {
      state.books.push(payload);
    });

    builder.addCase(removeBook.fulfilled, (state, { payload }) => {
      state.books = state.books.filter((book) => book._id !== payload._id);
    });
  },
});

export default booksSlice.reducer;
