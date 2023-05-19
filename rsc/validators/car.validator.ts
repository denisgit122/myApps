import * as Joi from "joi";

import { ECity, EMarkCar, EModelCar } from "../types/car.types";

export class CarValidator {
  private static mark = Joi.valid(...Object.values(EMarkCar));
  private static model = Joi.valid(...Object.values(EModelCar));
  private static price = Joi.number().min(1000).max(1000000);
  private static year = Joi.number().min(1990).max(new Date().getFullYear());
  private static power = Joi.string().trim().lowercase();
  private static description = Joi.string().trim().lowercase();
  private static city = Joi.valid(...Object.values(ECity));

  static createCar = Joi.object({
    mark: this.mark.required(),
    model: this.model.required(),
    price: this.price.required(),
    year: this.year.required(),
    power: this.power.required(),
    description: this.description.required(),
    city: this.city.required(),
  });
  static updateCar = Joi.object({
    price: this.price,
    model: this.model,
    mark: this.mark,
    power: this.power,
    year: this.power,
    // description: this.description,
  });
}
