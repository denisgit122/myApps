import { ICar } from "./car.types";

export enum EGender {
  // @ts-ignore
  male = "male",
  // @ts-ignore
  female = "female",
  // @ts-ignore
  mixed = "mixed",
}
export enum EUser {
  user = "user",
}
export enum EStatusVip {
  true = "true",
  false = "false",
}
export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  gender: string;
  statusVip: string;
  status: string;
  badDesc: number;
}
export interface IUserComment<T> {
  message: string;
  data: T;
}
export interface IUserDelete {
  message: string;
}
interface IIndex {
  [index: string]: any;
}
export type IRequest = IIndex;

export type IC = Pick<ICar, "mark">;
