import bookService from "./bookService.js";

const getBooks = async (req, res) => {
  try {
    const books = await bookService.getAllBooks(req.query);
    // console.log(books);
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBook = async (req, res) => {
  try {
    const book = await bookService.getBookById(+req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addBook = async (req, res) => {
  try {
    const book = await bookService.createBook(req.body, req.currentUser.id);
    // console.log(book);
    return res.status(201).json(book);
  } catch (error) {
    // console.log(error.message);
    return res.status(400).json({ error: error.message });
  }
};

const updateBooks = async (req, res) => {
  try {
    // console.log(req.params.id, req.body, req.currentUser, "controller");
    const book = await bookService.updateBook(
      req.params.id,
      req.body,
      req.currentUser
    );
    // console.log(book);
    if (!book) return res.status(404).json({ error: "Book not found" });
    return res.json(book);
  } catch (error) {
    return res.json({ error: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const success = await bookService.removeBook(
      req.params.id,
      req.currentUser
    );

    if (!success) return res.status(404).json({ error: "Book not found" });
    res.json(success).status(204);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export default { getBooks, getBook, addBook, updateBooks, deleteBook };
