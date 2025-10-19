import { loginService, registerService } from "./authService.js";

const registerController = async (req, res) => {
  try {
    const createdUser = await registerService(req.body);
    // console.log(req.body);
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const loginController = async (req, res) => {
  try {
    const token = await loginService(req.body);
    res.json({ authToken: token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default { loginController, registerController };
