import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors/api.error";
import { Admin } from "../models/admin.model";
import { Manager } from "../models/manager.model";
import { User } from "../models/User.model";
import { IRequest } from "../types/user.types";
import { UserValidator } from "../validators/user.validator";

class UserMiddleware {
  public async getByIdAndThrow(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);
      req.res.locals.user = user;
      if (!user) {
        throw new ApiError("user not found", 404);
      }
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
        const user = await User.findOne({ [dbField]: fieldValue });
        console.log(user);
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

  public getDynamicalOrThrow(
    fieldName: string,
    from = "body",
    dbField = fieldName
  ) {
    return async (req: IRequest, res: Response, next: NextFunction) => {
      try {
        const fieldValue = req[from][fieldName];

        const admin = await Admin.findOne({ [dbField]: fieldValue });
        const manager = await Manager.findOne({ [dbField]: fieldValue });
        const user = await User.findOne({ [dbField]: fieldValue });
        if (user) {
          req.res.locals = { user };
        }
        if (manager) {
          req.res.locals = { manager };
        }
        if (admin) {
          res.locals.admin = admin;
        }

        if (!user && !manager && !admin) {
          throw new ApiError("User or manager not found", 401);
        }

        next();
      } catch (e) {
        next(e);
      }
    };
  }

  // valid date
  public async isValidCreate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // ваlідуємо всу що в  body
      const { error, value } = UserValidator.create.validate(req.body);
      if (error) {
        throw new ApiError(error.message, 400);
      }
      req.body = value;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async isValidUpdate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // ваlідуємо всу що в  body
      const { error, value } = UserValidator.update.validate(req.body);
      if (error) {
        throw new ApiError(error.message, 400);
      }
      req.body = value;
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
      if (!isObjectIdOrHexString(req.params.userId)) {
        throw new ApiError("Id not valid", 400);
      }
      next();
    } catch (e) {
      next(e);
    }
  }

  public async isValidLogin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // ваlідуємо всу що в  body
      const { error } = UserValidator.loginUser.validate(req.body);
      if (error) {
        throw new ApiError(error.message, 400);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
  public async isValidForgotPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error } = UserValidator.forgotPassword.validate(req.body);
      if (error) {
        throw new ApiError(error.message, 400);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
}
export const userMiddleware = new UserMiddleware();
