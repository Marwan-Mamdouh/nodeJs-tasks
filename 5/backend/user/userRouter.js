import { Router } from "express";
import { authMiddleware } from "../middleware/auth.js";
import usersController from "./userController.js";

const router = Router();

router.use(authMiddleware);

router.get("/", usersController.getUsers);
router.get("/me", usersController.getUser);
router.patch("/:id/role", usersController.updateUserRole);
router.delete("/:id", usersController.deleteUser);

export { router as usersRouter };
