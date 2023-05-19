import { ApiError } from "../errors/api.error";
import { Admin } from "../models/admin.model";
import { Car } from "../models/Car.model";
import { Manager } from "../models/manager.model";
import { User } from "../models/User.model";
import { IUser } from "../types/user.types";

class UserService {
  public getAll(): Promise<IUser[]> {
    try {
      return User.find();
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public getOne(userId: string): Promise<IUser> {
    try {
      // return User.findById(userId);
      return User.findById(userId);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async delete(userId: string, jwtPayload: IUser): Promise<void> {
    try {
      const admin = await Admin.findById(jwtPayload._id);
      const manager = await Manager.findById(jwtPayload._id);
      const user = await User.findById(jwtPayload._id);
      const car = await Car.find({ user: userId });

      if (manager || jwtPayload._id === userId || admin) {
        if (car) {
          Car.deleteMany({ user: userId });
        }
        await User.deleteOne({ _id: userId });
      } else if (manager && !user) {
        await User.deleteOne({ _id: userId });
      } else if (!manager && user) {
        throw new ApiError("User cant delete user", 404);
      }
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}
export const userService = new UserService();
