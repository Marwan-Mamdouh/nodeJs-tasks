import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@mui/material";
import { red } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { removeBook } from "../redux/slices/booksSlice";

const limitLines = (numberOfLines) => {
  return {
    overflow: "hidden",
    display: "-webkit-box",
    color: "text.secondary",
    textOverflow: "ellipsis",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: numberOfLines,
  };
};

const BookCard = ({ book, handleEditBook }) => {
  const dispatch = useDispatch();

  const handleDeleteBook = () => {
    // send a delete order to the back end with the jwt from the local storage
    dispatch(removeBook(book._id));
  };
  // console.log(book);
  return (
    <Card
      sx={{
        width: 300,
        height: 410,
        m: "auto",
        transition: "all 0.3s ease-in-out",
        backgroundColor: "#778da9",
        boxShadow: "0 5px 20px -3px rgba(25,35,47,0.2)",
        "&:hover": {
          transform: "scale(1.05)",
          backgroundColor: "#e0e1dd",
          opacity: 0.9,
        },
        "&:hover .hoverIcon": {
          opacity: 1,
          transition: "all 0.3s ease-in-out",
        },
      }}
    >
      {book?.bookCoverImage && (
        <CardMedia
          component={"img"}
          height={300}
          image={book?.bookCoverImage}
          alt="book poster"
        />
      )}
      <CardContent>
        {book?.title && (
          <Typography variant="h6" sx={limitLines(1)}>
            {book?.title}
          </Typography>
        )}
        {book?.description && (
          <Typography variant="body2" sx={limitLines(3)}>
            {book?.description}
          </Typography>
        )}
        {book?.price && (
          <Typography variant="subtitle1">price ${book?.price}</Typography>
        )}
      </CardContent>
      <CardActions>
        <IconButton
          className="hoverIcon"
          aria-label="edit book"
          sx={{ position: "absolute", top: "87%", right: "20%", opacity: 0 }}
          onClick={() => {
            handleEditBook(book);
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          className="hoverIcon"
          aria-label="delete book"
          sx={{
            position: "absolute",
            top: "87%",
            right: "7%",
            opacity: 0,
            color: red[400],
          }}
          onClick={handleDeleteBook}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default BookCard;
