import {
  TextField,
  Typography,
  Button,
  Fade,
  Modal,
  Box,
  Backdrop,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addBook, editBook } from "../redux/slices/booksSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 3,
  display: "flex",
  flexDirection: "column",
  p: 4,
  gap: 4,
};

const initialData = {
  title: "",
  description: "",
  genre: "",
  price: "",
  bookCoverImage: "",
  publishedYear: "",
};

export default function TransitionsModal({ open, setOpen, book }) {
  // console.log(book);

  const [bookData, setBookData] = useState({ ...initialData, ...book });

  useEffect(() => {
    setBookData({ ...initialData, ...book });
  }, [book]);
  const dispatch = useDispatch();

  const handleClose = () => setOpen(false);

  const handleBookDataChange = (input) => {
    const { name, value } = input.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleClick = () => {
    // console.log(book._id, bookData);
    if (book) {
      dispatch(editBook({ id: book._id, updatedBook: bookData }));
    } else {
      dispatch(addBook(bookData));
    }
    setBookData(initialData);
    handleClose();
  };

  // const emptyFiled = () => {};

  return (
    <Box>
      {/* <Button sx={{ color: "white" }} onClick={handleOpen}>
        Add book
      </Button> */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Add book
            </Typography>
            <TextField
              variant="outlined"
              id="title"
              name="title"
              label="title"
              type="text"
              onChange={handleBookDataChange}
              value={bookData.title}
            />
            <TextField
              variant="outlined"
              id="description"
              name="description"
              label="description"
              type="text"
              onChange={handleBookDataChange}
              value={bookData.description}
            />
            <TextField
              variant="outlined"
              id="bookCoverImage"
              name="bookCoverImage"
              label="image url"
              type="text"
              onChange={handleBookDataChange}
              value={bookData.bookCoverImage}
            />
            <TextField
              variant="outlined"
              id="genre"
              name="genre"
              label="genre"
              type="text"
              onChange={handleBookDataChange}
              value={bookData.genre}
            />
            <TextField
              variant="outlined"
              id="price"
              name="price"
              label="price"
              type="text"
              onChange={handleBookDataChange}
              value={bookData.price}
            />
            <TextField
              variant="outlined"
              id="publishedYear"
              name="publishedYear"
              // label="publishedYear"
              helperText="published year"
              type="date"
              onChange={handleBookDataChange}
              value={bookData.publishedYear}
            />
            <Button onClick={handleClick} variant="contained">
              Submit
            </Button>
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
}
