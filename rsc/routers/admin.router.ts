import { Router } from "express";

import { adminController } from "../controllers/admin.controller";
import { carController } from "../controllers/car.controller";
import { managerController } from "../controllers/meneger.controller";
import { userController } from "../controllers/user.controller";
import { adminMiddleware } from "../middlewares/admin.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";
import { carMiddleware } from "../middlewares/car.middleware";
import { userMiddleware } from "../middlewares/user.middleware";

const router = Router();

router.get("/admin", adminController.getAll);
router.get("/manager", managerController.getAll);

router.post(
  "/admin/manager",
  authMiddleware.checkAccessToken,
  adminMiddleware.isValidCreate,
  adminMiddleware.getDynamicallyAndThrow("email", "body"),
  managerController.create
);
// router.post("/admin/create", ManagerController.create);
// "name": "mash",
//     "email": "mash@gmail.com",
//     "password": "hgjFGHF4",
//     "admin": "admin"
router.get("/cars", carController.getAll);

router.delete(
  "/cars/:carId",
  authMiddleware.checkAccessToken,
  carMiddleware.isValidId,
  carMiddleware.getByIdAndThrow,
  carController.delete
);
router.delete(
  "/manager/:managerId",
  authMiddleware.checkAccessToken,
  adminMiddleware.isValidId,
  adminMiddleware.getByIdAndThrow,
  managerController.delete
);
router.delete(
  "/user/:userId",
  authMiddleware.checkAccessToken,
  userMiddleware.isValidId,
  userMiddleware.getByIdAndThrow,
  userController.delete
);
export const AdminRouter = router;
