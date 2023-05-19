import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import { ApiError } from "../errors/api.error";
import { Car } from "../models/Car.model";
import { Manager } from "../models/manager.model";
import { User } from "../models/User.model";
import { carService } from "../services/car.service";
import { ICommonResponse } from "../types/auth.types";
import { ICar } from "../types/car.types";
import { ITokenPayload } from "../types/token.types";
import { IUserComment } from "../types/user.types";

class CarController {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICar[]>> {
    try {
      const car = await Car.find();

      return res.json(car);
    } catch (e) {
      next(e);
    }
  }

  public async getOne(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICar>> {
    try {
      const { car, jwtPayload } = res.locals;

      const result = await carService.getById(jwtPayload._id, car._id);
      return res.json(result);
    } catch (e) {
      next(e);
    }
  }

  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<ICommonResponse<ICar>>> {
    try {
      const { _id } = req.res.locals.jwtPayload as ITokenPayload;

      const { jwtPayload } = req.res.locals;
      const user = await User.findById(jwtPayload._id);
      const cars = await Car.findOne({ user: _id });
      const body = req.body;
      const status = user.statusVip;

      if (!user) {
        throw new ApiError("Just user can create car", 404);
      }
      const car = await carService.creat(jwtPayload, status, cars, body);
      // console.log(car);
      return res.status(201).json(car);
    } catch (e) {
      next(e);
    }
  }

  public async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUserComment<ICar>>> {
    try {
      const { carId } = req.params;
      const { jwtPayload, car } = req.res.locals;

      const manager = await Manager.findById(jwtPayload._id);
      const user = await User.findById(jwtPayload._id);

      let updateCar = "";

      if (manager || jwtPayload._id == car.user) {
        updateCar = await Car.findByIdAndUpdate(
          carId,
          { ...req.body },
          { new: true }
        );
      } else if (manager && !user) {
        updateCar = await Car.findByIdAndUpdate(
          carId,
          { ...req.body },
          { new: true }
        );
      } else if (!manager && user) {
        throw new ApiError("User cant update other user", 404);
      }
      return res.status(201).json(updateCar);
    } catch (e) {
      next(e);
    }
  }

  public async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<void>> {
    try {
      const { carId } = req.params;
      const { jwtPayload } = req.res.locals;
      const ss = await carService.delete(carId, jwtPayload);
      console.log(ss);
      return res.sendStatus(200);
    } catch (e) {
      next(e);
    }
  }

  public async uploadPhoto(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<void>> {
    try {
      const { carId } = req.params;
      const photo = req.files.photo as UploadedFile;
      const { jwtPayload } = req.res.locals;

      const car = await carService.uploadPhoto(photo, carId, jwtPayload);
      return res.status(201).json(car);
    } catch (e) {
      next(e);
    }
  }

  public async searchCar(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const filter = req.query;
      console.log(filter);
      const searchedCar = await Car.find(filter);
      res.send(searchedCar);
    } catch (e) {
      next(e);
    }
  }

  // views
  public async allViews(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUserComment<ICar>>> {
    try {
      const { carId } = req.params;
      const body = req.body;

      const updateCar = await carService.update(carId, body);

      return res.status(201).json(updateCar);
    } catch (e) {
      next(e);
    }
  }
}
export const carController = new CarController();
