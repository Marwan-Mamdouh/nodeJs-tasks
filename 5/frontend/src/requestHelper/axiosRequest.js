import axios from "axios";

export const getAllBooksCall = async () =>
  await axios
    .get("http://localhost:3000/api/v1/books")
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((error) => console.error(error));

export const addBookCall = async (data) => {
  const userToken = localStorage.getItem("userToken");
  return await axios
    .post(`http://localhost:3000/api/v1/books`, data, {
      headers: { authorization: `Bearer ${userToken}` },
    })
    .then((res) => res.data)
    .catch((err) => console.error(err.message));
};

export const editBookCall = async (id, updatedBook) => {
  const userToken = localStorage.getItem("userToken");
  return await axios
    .put(`http://localhost:3000/api/v1/books/${id}`, updatedBook, {
      headers: { authorization: `Bearer ${userToken}` },
    })
    .then((res) => res.data)
    .catch((err) => console.error(err.message));
};

export const removeBookCall = async (id) => {
  const userToken = localStorage.getItem("userToken");
  return await axios
    .delete(`http://localhost:3000/api/v1/books/${id}`, {
      headers: {
        authorization: `Bearer ${userToken}`,
      },
    })
    .then((res) => res.data)
    .catch((err) => console.error(err.message));
};

export const login = async (data) => {
  return await axios
    .post("http://localhost:3000/api/v1/auth/login", data)
    .then((res) => res.data)
    .catch((err) => console.error(err.message));
};

export const register = async (data) => {
  return await axios
    .post("http://localhost:3000/api/v1/auth/register", data)
    .then((res) => res.data)
    .catch((err) => console.error(err));
};
