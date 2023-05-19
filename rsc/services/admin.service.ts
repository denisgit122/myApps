import { ApiError } from "../errors/api.error";
import { Admin } from "../models/admin.model";
import { Manager } from "../models/manager.model";
import { IManager } from "../types/admin.types";
import { ITokenPayload } from "../types/token.types";
import { passwordService } from "./password.sevice";

class AdminService {
  public async createManag(body: IManager): Promise<void> {
    try {
      const hashedPassword = await passwordService.hash(body.password);
      await Manager.create({
        ...body,
        password: hashedPassword,
      });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async deleteManag(
    managerId: string,
    jwt: ITokenPayload
  ): Promise<void> {
    try {
      const admin = await Admin.findById(jwt._id);

      if (admin) {
        await Manager.deleteOne({ _id: managerId });
      } else if (!admin) {
        throw new ApiError("Just admin can delete maanger", 404);
      }
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}
export const adminrService = new AdminService();
