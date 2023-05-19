import { model, Schema, Types } from "mongoose";

import { EMarkSkoda, EModelSkoda } from "../../types/car.types";
import { User } from "../User.model";

const SkodaSchema = new Schema(
  {
    mark: {
      type: String,
      enum: EMarkSkoda,
      trim: true,
      required: [true, "Mark is required"],
      lowercase: true,
    },
    model: {
      type: String,
      enum: EModelSkoda,
      required: [true, "Model is required"],
      trim: true,
      lowercase: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      trim: true,
      lowercase: true,
    },
    year: {
      type: Number,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
    },
    power: {
      type: String,
      required: [true, "Power is required"],
      trim: true,
      lowercase: true,
    },
    user: {
      type: Types.ObjectId,
      required: true,
      ref: User,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
export const Skoda = model("car", SkodaSchema);
