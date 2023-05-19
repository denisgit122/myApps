import express, { NextFunction, Request, Response } from "express";
import fileUpload from "express-fileupload";
import mongoose from "mongoose";

import { configs } from "./configs/config";
import { cronRunner } from "./crons";
import { AdminRouter } from "./routers/admin.router";
import { AuthRouter } from "./routers/auth.router";
import { CarRouter } from "./routers/car.router";
import { UserRouter } from "./routers/user.router";
import { IError } from "./types/error.type";
const app = express();

app.use(express.json());
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));

app.use("/cars", CarRouter);
app.use("/", AdminRouter);
app.use("/user", UserRouter);
app.use("/auth", AuthRouter);

app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status;
  res.status(status).json({
    message: err.message,
    status,
  });
});

app.listen(configs.PORT, () => {
  mongoose.connect(configs.DB_URL);
  cronRunner();
  console.log(`Server has started on ${configs.PORT} 🚀🚀🚀`);
});
