import { EEmailActions } from "../constants/email.constants";
import { EActionToken } from "../enums/action-token-type-enum";
import { ApiError } from "../errors/api.error";
import { Action } from "../models/Action.model";
import { Token } from "../models/token.model";
import { User } from "../models/User.model";
import { ICredentials } from "../types/auth.types";
import { ITokenPair, ITokenPayload } from "../types/token.types";
import { IUser } from "../types/user.types";
import { emailService } from "./email.service";
import { passwordService } from "./password.sevice";
import { tokenService } from "./token.service";

class AuthService {
  public async register(body: IUser): Promise<void> {
    try {
      const hashedPassword = await passwordService.hash(body.password);
      await User.create({
        ...body,
        password: hashedPassword,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async login(
    credentials: ICredentials,
    user: IUser
  ): Promise<ITokenPair> {
    try {
      const isMatched = await passwordService.compare(
        credentials.password,
        user.password
      );
      if (!isMatched) {
        throw new ApiError("Invalid email or password", 400);
      }
      const tokenPair = tokenService.generateTokenPair({
        _id: user._id,
        name: user.name,
      });
      await Token.create({ _user_id: user._id, ...tokenPair });
      return tokenPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async refresh(
    tokenInfo: ITokenPair,
    jwtPayload: ITokenPayload
  ): Promise<ITokenPair> {
    try {
      const tokenPair = tokenService.generateTokenPair({
        _id: jwtPayload._id,
        name: jwtPayload.name,
      });
      await Promise.all([
        Token.create({
          _user_id: jwtPayload._id,
          ...tokenPair,
        }),
        Token.deleteOne({ refreshToken: tokenInfo.refreshToken }),
      ]);
      return tokenPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async forgotPassword(user: IUser): Promise<void> {
    try {
      const actionToken = tokenService.generateActionToken(
        { _id: user._id },
        EActionToken.forgot
      );
      await Action.create({
        actionToken,
        tokenType: EActionToken.forgot,
        _user_id: user._id,
      });
      await emailService.sendE(user.email, EEmailActions.FORGOR_PASSWORD, {
        token: actionToken,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async setForgotPassword(password: string, id: string): Promise<void> {
    try {
      const hashedPassword = await passwordService.hash(password);

      await User.updateOne({ _id: id }, { password: hashedPassword });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}
export const authService = new AuthService();
