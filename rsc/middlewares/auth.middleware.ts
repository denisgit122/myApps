import { NextFunction, Request, Response } from "express";

import { EActionToken } from "../enums/action-token-type-enum";
import { EToken } from "../enums/token.enum";
import { ApiError } from "../errors/api.error";
import { Action } from "../models/Action.model";
import { Token } from "../models/token.model";
import { tokenService } from "../services/token.service";

class AuthMiddleware {
  public async checkAccessToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const access = req.get("Authorization");
      if (!access) {
        throw new ApiError(" Access Token not found", 401);
      }

      const jwtPayload = tokenService.checkToken(access);
      const token = await Token.findOne({ accessToken: access });
      if (!token) {
        throw new ApiError("Token is not valid", 401);
      }

      req.res.locals = { token, jwtPayload };
      next();
    } catch (e) {
      next(e);
    }
  }
  public async checkRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const refresh = req.get("Authorization");
      if (!refresh) {
        throw new ApiError(" Access Token not found", 401);
      }

      const jwtPayload = tokenService.checkToken(refresh, EToken.refresh);
      const token = await Token.findOne({ refreshToken: refresh });
      if (!token) {
        throw new ApiError("Token is not valid", 401);
      }
      req.res.locals = { token, jwtPayload };
      next();
    } catch (e) {
      next(e);
    }
  }
  public async checkActionForgotToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const actionToken = req.params.token;

      if (!actionToken) {
        throw new ApiError(" Access Token not found", 401);
      }

      const jwtPayload = tokenService.checkActionToken(
        actionToken,
        EActionToken.forgot
      );
      const token = await Action.findOne({ actionToken });
      if (!token) {
        throw new ApiError("Token is not valid", 401);
      }
      req.res.locals = { token, jwtPayload };
      next();
    } catch (e) {
      next(e);
    }
  }
}
export const authMiddleware = new AuthMiddleware();
