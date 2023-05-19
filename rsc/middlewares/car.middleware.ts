import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";

import { ApiError } from "../errors/api.error";
import { Admin } from "../models/admin.model";
import { Car } from "../models/Car.model";
import { Manager } from "../models/manager.model";
import { User } from "../models/User.model";
import { carService } from "../services/car.service";
import { emailService } from "../services/email.service";
import { CarValidator } from "../validators/car.validator";

class CarMiddleware {
  public async getByIdAndThrow(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { carId } = req.params;
      const car = await Car.findById(carId);
      if (!car) {
        throw new ApiError("car not found", 404);
      }
      req.res.locals.car = car;
      next();
    } catch (e) {
      next(e);
    }
  }
  // valid date
  public async isValidCreate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // ваlідуємо всу що в  body
      const { error, value } = CarValidator.createCar.validate(req.body);
      if (error) {
        throw new ApiError(error.message, 400);
      }
      req.body = value;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async isValidUpdate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // ваlідуємо всу що в  body
      const { error, value } = CarValidator.updateCar.validate(req.body);
      if (error) {
        throw new ApiError(error.message, 400);
      }
      req.body = value;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async isValidId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!isObjectIdOrHexString(req.params.carId)) {
        throw new ApiError("Id not valid", 400);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
  public async isValidDescription(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const car = req.body;
      const desc = car.description;

      const { jwtPayload } = req.res.locals;
      const id = jwtPayload._id;
      const user = await User.findById(id);
      const badDesc = user.badDesc;
      const inc = +badDesc + 1;
      // await User.findByIdAndUpdate(id, {
      //   badDesc: 1,
      // });
      console.log(inc);
      const bad = [
        "shit",
        "сука",
        "son of bitch",
        "arsehole",
        "balls",
        "bint",
        "bollocks",
        "bullshit",
        "munter",
      ];
      for (const string of bad) {
        if (badDesc <= 4 && desc.includes(string)) {
          await User.findByIdAndUpdate(id, {
            badDesc: inc,
          });
          throw new ApiError(
            `Your description contains profanity ${badDesc} time, remind 3 times and you will no longer be able to create ads until the manager grants you this right`,
            400
          );
        } else if (badDesc >= 4) {
          console.log(12);
          await emailService.sendMail("yaholnykd@gmail.com", user);
          throw new ApiError(
            "Your description has been sent to an administrator because you are using profanity, please wait",
            400
          );
        }
        if (badDesc <= 4 && !desc.includes(string)) {
          console.log("ok");
        }
      }

      next();
    } catch (e) {
      next(e);
    }
  }

  public async isValidaVeragePriceCarCity(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { car, jwtPayload } = res.locals;
      const id = jwtPayload._id;
      const carArr = await Car.find({
        mark: car.mark,
        model: car.model,
        city: car.city,
      });
      const carsUkr = await Car.find({
        mark: car.mark,
        model: car.model,
      });
      const manager = await Manager.findById(id);
      const user = await User.findById(id);
      const admin = await Admin.findById(id);

      if (manager || admin || user.statusVip === "true") {
        const averagePriceCarUkr = await carService.isValid(carsUkr);
        const averagePriceCarCity = await carService.isValid(carArr);

        await Car.findByIdAndUpdate(car._id, {
          averagePriceCarCity,
          averagePriceCarUkr,
        });
      } else if (user.statusVip === "false" || !admin) {
        await Car.findByIdAndUpdate(car._id, {
          averagePriceCarCity: null,
          averagePriceCarUkr: null,
        });
      }
      next();
    } catch (e) {
      next(e);
    }
  }
}
export const carMiddleware = new CarMiddleware();
