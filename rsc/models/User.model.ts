import { model, Schema } from "mongoose";

import { EGender, EStatusVip, EUser } from "../types/User.types";

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
    },
    gender: {
      type: String,
      enum: EGender,
    },
    statusVip: {
      type: String,
      enum: EStatusVip,
    },
    status: {
      type: String,
      enum: EUser,
    },
    badDesc: {
      type: Number,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
export const User = model("user", userSchema);
