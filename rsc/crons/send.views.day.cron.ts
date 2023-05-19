import { CronJob } from "cron";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { Car } from "../models/Car.model";
import { User } from "../models/User.model";
import { emailService } from "../services/email.service";

dayjs.extend(utc);

const viewsDa = async (): Promise<void> => {
  const user = await User.find();

  for (const userElement of user) {
    const carId = await Car.find({ user: userElement._id });
    if (userElement.statusVip == "true" && carId) {
      for (const carElement of carId) {
        await emailService.sendViewsDay(
          "day",
          userElement.email,
          carElement,
          carElement.viewsMonth
        );
        await Car.findByIdAndUpdate(carElement._id, { viewsDay: 0 });
      }
    } else if (userElement.statusVip == "false" && carId) {
      for (const carIdElement of carId) {
        await Car.findByIdAndUpdate(carIdElement._id, { viewsDay: null });
      }
    }
  }
};
export const viewsDay = new CronJob(" 0 2 * * *", viewsDa);

const viewsMont = async (): Promise<void> => {
  const user = await User.find();

  for (const userElement of user) {
    const carId = await Car.find({ user: userElement._id });
    if (userElement.statusVip == "true" && carId) {
      for (const carElement of carId) {
        await emailService.sendViewsDay(
          "month",
          userElement.email,
          carElement,
          carElement.viewsMonth
        );
        await Car.findByIdAndUpdate(carElement._id, { viewsMonth: 0 });
      }
    } else if (userElement.statusVip == "false" && carId) {
      for (const carIdElement of carId) {
        await Car.findByIdAndUpdate(carIdElement._id, { viewsMonth: null });
      }
    }
  }
};
export const viewsMonth = new CronJob("0 0 1 * *", viewsMont);

const viewsWeeks = async (): Promise<void> => {
  const user = await User.find();

  for (const userElement of user) {
    const carId = await Car.find({ user: userElement._id });
    if (userElement.statusVip == "true" && carId) {
      for (const carElement of carId) {
        await emailService.sendViewsDay(
          "week",
          userElement.email,
          carElement,
          carElement.viewsWeek
        );
        await Car.findByIdAndUpdate(carElement._id, { viewsWeek: 0 });
      }
    } else if (userElement.statusVip == "false" && carId) {
      for (const carIdElement of carId) {
        await Car.findByIdAndUpdate(carIdElement._id, { viewsWeek: null });
      }
    }
  }
};
export const viewsWeek = new CronJob("0 0  * * 1 ", viewsWeeks);
