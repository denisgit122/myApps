import { model, Schema } from "mongoose";

const managerSchema = new Schema(
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
      unique: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
export const Manager = model("manager", managerSchema);
