import { config } from "dotenv";
config();
export const configs = {
  PORT: process.env.PORT || 5200,
  DB_URL: process.env.DB_URL || "oiuoiui",

  ACCESS_SECRET: "mi_api_Access",
  REFRESH_SECRET: "mi_api_Refresh",

  FORGOT_SECRET: process.env.JWT_FORGOT_SECRET,
  ACTIVATE_SECRET: process.env.JWT_ACTIVATE_SECRET,

  NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL,
  NO_REPLY_PASSWORD: process.env.NO_REPLY_PASSWORD,

  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
  AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
  AWS_S3_URL: process.env.AWS_S3_URL,

  AWS_S3_NAME: process.env.AWS_S3_NAME,
  AWS_S3_REGION: process.env.AWS_S3_REGION,

  AWS_S3_ACL: process.env.AWS_S3_ACL,
};
