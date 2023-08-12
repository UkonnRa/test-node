import { createLogger, format, transports } from "winston";
import { Sequelize, Dialect } from "@sequelize/core";
import "dotenv/config";
import { POS } from "./po";

export * from "./po";
export * from "./bo";

export const logger = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: [new transports.Console()],
});

export const sequelize = new Sequelize(process.env.APP_DATABASE_URL as string, {
  dialect: process.env.APP_DATABASE_DIALECT as Dialect,
  logging: (msg) => logger.info(msg),
  models: POS,
  define: {
    underscored: true,
  },
});
