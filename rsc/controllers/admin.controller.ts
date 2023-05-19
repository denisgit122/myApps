import { NextFunction, Request, Response } from "express";

import { Admin } from "../models/admin.model";
import { IAdmin } from "../types/admin.types";

class AdminController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IAdmin>> {
    try {
      const admin = await Admin.find();
      return res.status(201).json(admin);
    } catch (e) {
      next(e);
    }
  }
}
export const adminController = new AdminController();
