import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.error";
import { Admin } from "../models/admin.model";
import { Manager } from "../models/manager.model";
import { adminrService } from "../services/admin.service";
import { IManager } from "../types/admin.types";

class ManagerController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IManager[]>> {
    try {
      const manager = await Manager.find();
      return res.status(201).json(manager);
    } catch (e) {
      next(e);
    }
  }
  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IManager>> {
    try {
      const { jwtPayload } = res.locals;
      const admin = await Admin.findById(jwtPayload._id);
      if (admin) {
        await adminrService.createManag(req.body);
      } else if (!admin) {
        throw new ApiError("just admin can create manager", 404);
      }
      return res.sendStatus(201);
    } catch (e) {
      next(e);
    }
  }
  public async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<void>> {
    try {
      const { managerId } = req.params;
      const { jwtPayload } = req.res.locals;
      await adminrService.deleteManag(managerId, jwtPayload);

      return res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  }
}
export const managerController = new ManagerController();
