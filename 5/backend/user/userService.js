import userRepository from "./userRepository.js";

const userResponseDto = (user) => {
  return {
    id: user._id,
    username: user.username,
    role: user.role,
  };
};

const getAllUsers = async () =>
  (await userRepository.findUsers()).map(userResponseDto);

const findUser = async (id) =>
  userResponseDto(await userRepository.findUserById(id));

const updateRole = async (body) => await userRepository.update(body.id, body);

const deleteUserById = async (id) => await userRepository.removeUser(id);

export default { getAllUsers, findUser, deleteUserById, updateRole };
