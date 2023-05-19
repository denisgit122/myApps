import { model, Schema } from "mongoose";

const adminSchema = new Schema(
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
    admin: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
export const Admin = model("admin", adminSchema);
