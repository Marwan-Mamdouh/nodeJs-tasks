import { Router } from "express";
import authController from "./authController.js";

const router = Router();

router.post("/login", authController.loginController);
router.post("/register", authController.registerController);

export { router as authRouter };
