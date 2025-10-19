import bcrypt from "bcryptjs";
import userRepository from "../user/userRepository.js";
import { generateToken } from "../jwt/jwtUtil.js";

//* ========== private helper functions ==========
const isUserValidData = ({ username, password }) => {
  if (!username || !password) throw Error("username & Password are required!");
};

const isUserExists = async ({ username }) => {
  const user = await userRepository.getUserByUsername(username);
  if (user) throw Error("User Exists!");
};

const hashUserPassword = async (password) => await bcrypt.hash(password, 12);

const isValidProp = (data) => {
  if (!data) throw Error("Invalid username or password");
};

//* ========== public functions ==========
const loginService = async ({ username, password }) => {
  if (!username || !password) {
    throw new Error("Username & Password are required.");
  }

  const user = await getUserByUsername(username);
  isValidProp(user);

  const isValidPassword = await bcrypt.compare(`${password}`, user.password);
  isValidProp(isValidPassword);

  const tokenPayLoad = {
    id: user._id,
    username: username,
    role: user.role,
  };

  return generateToken(tokenPayLoad);
};

const registerService = async (userData) => {
  isUserValidData(userData);
  await isUserExists(userData);
  const hashedPassword = await hashUserPassword(userData.password);
  const newUser = await userRepository.createNewUser({
    ...userData,
    password: hashedPassword,
  });

  return {
    id: newUser._id,
    username: newUser.username,
    role: newUser.role,
    name: newUser.name,
  };
};

export { loginService, registerService };
