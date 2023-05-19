import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { userMiddleware } from "../middlewares/user.middleware";

const router = Router();
router.get("/", userController.getAll);

router.get(
  "/:userId",
  authMiddleware.checkAccessToken,
  userMiddleware.isValidId,
  userMiddleware.getByIdAndThrow,
  userController.getOne
);

router.put(
  "/:userId",
  authMiddleware.checkAccessToken,
  userMiddleware.isValidId,
  userMiddleware.getByIdAndThrow,
  userMiddleware.isValidUpdate,
  userController.update
);

export const UserRouter = router;
