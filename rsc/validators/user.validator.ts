import * as Joi from "joi";

import { regexPasAndEma } from "../constants/regex.constants";
import { EGender, EStatusVip, EUser } from "../types/user.types";

export class UserValidator {
  private static firstName = Joi.string().min(2).max(50).trim();
  private static email = Joi.string()
    .regex(regexPasAndEma.EMAIL)
    .trim()
    .lowercase();
  private static password = Joi.string().regex(regexPasAndEma.PASSWORD).trim();
  private static statusVip = Joi.valid(...Object.values(EStatusVip));
  private static gender = Joi.valid(...Object.values(EGender));
  private static status = Joi.valid(...Object.values(EUser));

  static create = Joi.object({
    name: this.firstName.required(),
    email: this.email.required(),
    password: this.password.required(),
    gender: this.gender.required(),
    statusVip: this.statusVip.required(),
    status: this.status.required(),
  });
  static update = Joi.object({
    name: this.firstName,
    gender: this.gender,
  });
  static loginUser = Joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });
  static forgotPassword = Joi.object({
    password: this.password,
  });
}
