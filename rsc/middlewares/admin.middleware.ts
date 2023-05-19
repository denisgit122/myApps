import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors/api.error";
import { Manager } from "../models/manager.model";
import { IRequest } from "../types/user.types";
import { AdminValidator } from "../validators/admin.validator";

class AdminMiddleware {
  // valid date
  public async isValidCreate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // ваlідуємо всу що в  body
      const { error, value } = AdminValidator.createManager.validate(req.body);
      if (error) {
        throw new ApiError(error.message, 400);
      }
      req.body = value;
      next();
    } catch (e) {
      next(e);
    }
  }
  public getDynamicallyAndThrow(
    fieldName: string,
    from = "body",
    dbField = fieldName
  ) {
    return async (req: IRequest, res: Response, next: NextFunction) => {
      try {
        const fieldValue = req[from][fieldName];
        const user = await Manager.findOne({ [dbField]: fieldValue });
        if (user) {
          throw new ApiError(
            `This with ${fieldValue} ${fieldName} already exist`,
            409
          );
        }

        next();
      } catch (e) {
        next(e);
      }
    };
  }
  public async getByIdAndThrow(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { managerId } = req.params;
      const manager = await Manager.findById(managerId);
      if (!manager) {
        throw new ApiError("manager not found", 404);
      }
      req.res.locals.manager = manager;
      next();
    } catch (e) {
      next(e);
    }
  }
  public async isValidId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!isObjectIdOrHexString(req.params.managerId)) {
        throw new ApiError("Id not valid", 400);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
}
export const adminMiddleware = new AdminMiddleware();
