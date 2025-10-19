import bookRepository from "./bookRepository.js";

const verifyAdminOrCreator = ({ role, username }, bookCreator, method) => {
  if (username !== bookCreator && role !== "admin")
    throw new Error(`can not ${method} book for not admin or book creator.`);
  console.log("done");
};

const getAllBooks = async ({ q, sort }) => {
  let filter = {};
  if (q) {
    const regex = new RegExp(q, "i");
    filter.$or = [{ title: regex }, { description: regex }];
  }
  return await bookRepository.find(filter, sort);
};

const getBookById = async (id) => {
  const book = await bookRepository.findById(id);
  if (!book) throw new Error("Book Not found.");
  return book;
};

const createBook = async (data, userId) =>
  await bookRepository.create({
    ...data,
    createdBy: userId,
    publishedYear: data.publishedYear.split("-")[0],
  });

const updateBook = async (id, data, currentUser) => {
  const book = await bookRepository.getBookById(id);
  // console.log(book);
  verifyAdminOrCreator(currentUser, book?.createdBy?.username, "update");
  const updatedBook = await update(id, data);
  // console.log(updatedBook);
  return updatedBook;
};

const removeBook = async (id, currentUser) => {
  const book = await bookRepository.getBookById(id);
  verifyAdminOrCreator(currentUser, book?.createdBy?.username, "delete");
  return await remove(id);
};

export default { getAllBooks, getBookById, createBook, updateBook, removeBook };
