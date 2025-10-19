import user from "./userModel.js";

const findUsers = async () => await user.find({});

const findUserById = async (id) => await user.findById(id);

const getUserByUsername = async (username) => await user.findOne({ username });

const update = async (id, data) =>
  await user.findByIdAndUpdate(
    { id },
    { $set: data },
    { new: true, runValidators: true }
  );

const createNewUser = async (data) => {
  const newUser = new user(data);
  return await newUser.save();
};

const removeUser = async (id) => await user.findByIdAndDelete({ id });

export default {
  findUsers,
  getUserByUsername,
  createNewUser,
  findUserById,
  update,
  removeUser,
};
