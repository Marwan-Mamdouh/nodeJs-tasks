import userService from "./userService.js";

const getUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    console.log(users);
    return res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await userService.findUser(req.currentUser.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUserRole = async (req, res) => {
  try {
    console.log(req.body);
    const user = await userService.updateRole(req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const success = await userService.deleteUserById(req.params.id);
    if (!success) return res.status(404).json({ error: "User not found" });
    res.send("user deleted");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default { getUsers, getUser, updateUserRole, deleteUser };
