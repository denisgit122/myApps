import { IUser } from "./user.types";

export interface IData {
  email: string;
  password: string;
}
export type ICredentials = Pick<IUser, "email" | "password">;

export interface IMessage {
  message: string;
}

export interface ICommonResponse<T> extends IMessage {
  data: T;
}
