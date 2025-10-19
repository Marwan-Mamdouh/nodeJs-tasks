import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../redux/slices/booksSlice";
import BookCard from "../components/bookCard";
import { Box, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import TransitionsModal from "../components/muiModel";

const Books = () => {
  const { books } = useSelector((state) => state.books);
  // console.log(books);
  const [open, setOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  const handleEditBook = (book) => {
    setCurrentBook(book);
    setOpen(true);
  };

  if (books.length === 0) return <Box>Loading...</Box>;

  return (
    <Box>
      <Box sx={{ pl: 150, pt: 3 }}>
        <Button variant="contained" onClick={() => setOpen(true)}>
          add book
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: { md: "row", xs: "column" },
        }}
      >
        <Grid container width={"85%"} spacing={2} sx={{ pt: 3 }}>
          {books.map((book) => (
            <Grid
              key={book?._id}
              size={{ md: 3, xs: 9 }}
              sx={{ m: "auto", display: "flex", justifyContent: "center" }}
            >
              <BookCard handleEditBook={handleEditBook} book={book} />
            </Grid>
          ))}
          <TransitionsModal open={open} setOpen={setOpen} book={currentBook} />
        </Grid>
      </Box>
    </Box>
  );
};

export default Books;
