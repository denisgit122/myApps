import { Schema, Types } from "mongoose";
import { model } from "mongoose";

import { User } from "./User.model";
const tokenSchema = new Schema(
  {
    _user_id: {
      type: Types.ObjectId,
      // силка на іншу модельку
      ref: User,
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);
export const Token = model("Token", tokenSchema);
