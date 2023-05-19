import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { userMiddleware } from "../middlewares/user.middleware";

const router = Router();

router.post(
  "/register",
  userMiddleware.isValidCreate,
  userMiddleware.getDynamicallyAndThrow("email", "body"),
  authController.register
);

router.post(
  "/login",
  userMiddleware.isValidLogin,
  userMiddleware.getDynamicalOrThrow("email"),
  authController.login
);

router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh
);

router.post(
  "/password/forgot",
  userMiddleware.getDynamicalOrThrow("email"),
  authController.forgotPassword
);
router.put(
  "/password/forgot/:token",
  userMiddleware.isValidForgotPassword,
  authMiddleware.checkActionForgotToken,
  authController.setForgotPassword
);
router.post("/login");

export const AuthRouter = router;
