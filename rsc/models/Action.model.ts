import { Schema, Types } from "mongoose";
import { model } from "mongoose";

import { EActionToken } from "../enums/action-token-type-enum";
import { User } from "./User.model";
const actionTokenSchema = new Schema(
  {
    _user_id: {
      type: Types.ObjectId,
      // силка на іншу модельку
      ref: User,
      required: true,
    },
    actionToken: {
      type: String,
      required: true,
    },
    tokenType: {
      type: String,
      enum: EActionToken,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
export const Action = model("Action", actionTokenSchema);
