import { configureStore } from "@reduxjs/toolkit";
import booksSlice from "./slices/booksSlice";
import UserSlice from "./slices/userSlice";
// import favBooksSlice from "./slices/favBooksSlice";

export const store = configureStore({
  reducer: {
    books: booksSlice,
    user: UserSlice,
    // favBooks: favBooksSlice,
  },
});
