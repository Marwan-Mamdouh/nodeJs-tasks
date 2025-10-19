import book from "./bookModel.js";

const findById = async (id) =>
  await book.findById(id).populate("createdBy", "username role");

const find = async (filter, sort) => {
  let query = await book.find(filter).populate("createdBy", "username role");
  query = sort ? query.sort(sort) : query;
  return query;
};

const create = async (data) => {
  console.log(data, "repository");
  const newBook = new book(data);
  return await newBook.save();
};

const update = async (id, data) =>
  await book.findByIdAndUpdate({ _id: id }, { $set: data }, { new: true });

const remove = async (id) => await book.findByIdAndDelete(id);

export default { findById, find, create, update, remove };
