import { Types } from "mongoose";

import { ApiError } from "../errors/api.error";
import { Admin } from "../models/admin.model";
import { Car } from "../models/Car.model";
import { Manager } from "../models/manager.model";
import { User } from "../models/User.model";
import { ICar } from "../types/car.types";
import { ITokenPayload } from "../types/token.types";
import { IUser } from "../types/user.types";
import { s3Service } from "./s3.service";

class CarService {
  public async creat(
    jwt: ITokenPayload,
    status: string,
    cars: any,
    body: ICar
  ): Promise<any> {
    try {
      const { _id } = jwt;

      if (status === "true") {
        return await Car.create({
          ...body,
          user: new Types.ObjectId(_id),
        });
      } else if (status === "false" && !cars) {
        return await Car.create({
          ...body,
          user: new Types.ObjectId(_id),
        });
      } else if (status === "false" && cars) {
        throw new ApiError("creat nead hav premium acount", 400);
      }
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async getById(userId: string, carId: string): Promise<ICar> {
    try {
      return await Car.findById(carId);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async isValid(carsUkr: any): Promise<number> {
    try {
      const priceUkr = [];
      const lengthUkr = carsUkr.length;
      const initialValueUkr = 0;

      for (const carUkr of carsUkr) {
        priceUkr.push(carUkr.price);
      }
      const sumWithInitialUkr = priceUkr.reduce(
        (previousValue, currentValue) => previousValue + currentValue,
        initialValueUkr
      );

      const averagePriceCarUkr = Math.round(sumWithInitialUkr / lengthUkr);
      return averagePriceCarUkr;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async update(carId: string, body: ICar): Promise<ICar> {
    try {
      return await Car.findByIdAndUpdate(carId, { ...body }, { new: true });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async delete(carId: string, jwtPayload: IUser): Promise<void> {
    try {
      const car = await Car.findById(carId);

      const manager = await Manager.findById(jwtPayload._id);
      const user = await User.findById(jwtPayload._id);
      const admin = await Admin.findById(jwtPayload._id);

      if (manager || jwtPayload._id == car.user || admin) {
        await Car.deleteOne({ _id: carId });
      } else if (manager && !user) {
        await Car.deleteOne({ _id: carId });
      } else if (!manager && user) {
        throw new ApiError("User cant delete car other user", 404);
      }
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async uploadPhoto(
    file: any,
    carId: string,
    jwtPayload: IUser
  ): Promise<ICar> {
    try {
      const arr = [];
      const admin = await Admin.findById(jwtPayload._id);
      const manager = await Manager.findById(jwtPayload._id);
      const user = await User.findById(jwtPayload._id);
      const car = await Car.findOne({ user: jwtPayload._id });
      console.log(car.user);
      console.log(jwtPayload._id);

      if (manager || jwtPayload._id == car.user || admin) {
        for (const fileElement of file) {
          const filePath = await s3Service.uploadPhoto(
            fileElement,
            "car",
            carId
          );
          arr.push(filePath);
        }
      } else if (manager && !user) {
        for (const fileElement of file) {
          const filePath = await s3Service.uploadPhoto(
            fileElement,
            "car",
            carId
          );
          arr.push(filePath);
        }
      } else if (!manager && user) {
        throw new ApiError("User cant add photo other user", 404);
      }
      return await Car.findByIdAndUpdate(carId, { photo: arr }, { new: true });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}
export const carService = new CarService();
