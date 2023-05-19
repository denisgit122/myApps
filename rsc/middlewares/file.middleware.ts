import { NextFunction, Request, Response } from "express";

import { photoCOn } from "../configs/file.configs";
import { ApiError } from "../errors/api.error";

class FileMiddleware {
  public isPhotoValid(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.files) {
        throw new ApiError("No files to upload", 404);
      }
      const { photo } = req.files;

      if (!Array.isArray(photo)) {
        throw new ApiError("you can't upload only one photo", 404);
      }
      for (const photoElement of photo) {
        const { size, mimetype, name } = photoElement;
        if (size > photoCOn.IMAGE_MAX) {
          throw new ApiError(`file ${name} is too big`, 404);
        }
        if (!photoCOn.IMAGE.includes(mimetype)) {
          throw new ApiError("file has invalid format", 404);
        }
      }

      next();
    } catch (e) {
      next(e);
    }
  }
}
export const fileMiddleware = new FileMiddleware();
