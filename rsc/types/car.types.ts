import { Types } from "mongoose";

import { IUser } from "./user.types";

export interface ICar {
  _id?: Types.ObjectId;
  mark: string;
  model: string;
  price: number;
  year: number;
  power: string;
  description: string;
  city: string;
  viewsDay: number;
  viewsMonth: number;
  viewsWeek: number;
  averagePriceCarCity: number;
  averagePriceCarUkr: number;
  photo: string;
  user: IUser | Types.ObjectId;
}
// export type ICreateCar = Pick<ICar, "mark" | "model" | "price", | "year", | "power", "description", | "city">;

export interface ICreateCar {
  _id?: Types.ObjectId;
  mark: string;
  model: string;
  price: number;
  year: number;
  power: string;
  description: string;
  city: string;
  user: IUser | Types.ObjectId;
}
export enum ECity {
  kyiv = "Kyiv",
  Kharkiv = "Kharkiv",
  Odesa = "Odesa",
  Dnipro = "Dnipro",
  Donetsk = "Donetsk",
  Zaporizhzhya = "Zaporizhzhya",
  Lviv = "Lviv",
  Kryvyi_Rih = "Kryvyi Rih",
  Mykolaiv = "Mykolaiv",
  Mariupol = "Mariupol",
  Luhansk = "Luhansk",
  Sevastopol = "Sevastopol",
  Vinnitsa = "Vinnitsa",
  Simferopol = "Simferopol",
  Makiivka = "Makiivka",
}
export enum EMarkCar {
  volkswagen = "volkswagen",
  mercedes = "mercedes-benz",
  bmw = "bmw",
  toyota = "toyota",
  audi = "audi",
  renault = "renault",
  ford = "ford",
  skoda = "skoda",
}
export enum EModelCar {
  polo = "polo",
  tiguan = "tiguan",
  passat = "passat",
  touareg = "touareg",
  golf = "golf",
  camry = "camry",
  auris = "auris",
  avensis = "avensis",
  celica = "celica",
  mark = "mark",
  eqs = "eqs",
  cla = "cla shooting brake",
  eclass = "e-class",
  clio = "clio",
  captur = "captur",
  laguna = "laguna",
  megane = "megane",
  puma = "puma",
  focus = "focus",
  kuga = "kuga",
  ecosport = "ecosport",
  octavia = "octavia",
  kodiaq = "kodiaq",
  kamiq = "kamiq",
  scala = "scala",
  x1 = "x1",
  x2 = "x2",
  x3 = "x3",
  x4 = "x4",
  x5 = "x5",
  x6 = "x6",
  x7 = "x7",
  rs6 = "rs6",
  a1 = "a1",
  a2 = "a2",
  a4 = "A4",
  a6 = "a6",
  tt = "tt",
}

export enum EMarkSkoda {
  skoda = "skoda",
}
export enum EMarkVolkswagen {
  volkswagen = "volkswagen",
}
export enum EMarkMercedes {
  mercedes = "mercedes-benz",
}
export enum EMarkBmw {
  bmw = "bmw",
}
export enum EMarkToyota {
  toyota = "toyota",
}
export enum EMarkAudi {
  audi = "audi",
}
export enum EMarkRenault {
  renault = "renault",
}
export enum EMarkFord {
  ford = "ford",
}

export enum EModelAudi {
  rs6 = "rs6",
  a1 = "a1",
  a2 = "a2",
  a4 = "A4",
  a6 = "a6",
  tt = "tt",
}
export enum EModelBmw {
  x1 = "x1",
  x2 = "x2",
  x3 = "x3",
  x4 = "x4",
  x5 = "x5",
  x6 = "x6",
  x7 = "x7",
}
export enum EModelSkoda {
  octavia = "octavia",
  kodiaq = "kodiaq",
  kamiq = "kamiq",
  scala = "scala",
}
export enum EModelFord {
  puma = "puma",
  focus = "focus",
  kuga = "kuga",
  ecosport = "ecosport",
}
export enum EModelRenault {
  clio = "clio",
  captur = "captur",
  laguna = "laguna",
  megane = "megane",
}
export enum EModelMercedes {
  eqs = "eqs",
  cla = "cla shooting brake",
  eclass = "e-class",
}
export enum EModelToyota {
  camry = "camry",
  auris = "auris",
  avensis = "avensis",
  celica = "celica",
  mark = "mark",
}
export enum EModelVolkswagen {
  polo = "polo",
  tiguan = "tiguan",
  passat = "passat",
  touareg = "touareg",
  golf = "golf",
}
