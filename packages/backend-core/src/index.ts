import { createLogger, format, transports } from "winston";
import { Sequelize, Dialect } from "@sequelize/core";
import { UserDAO } from "./user";
import { UserTagPO } from "./user_tag";
import "dotenv/config";
import { RecordItemDAO } from "./record_item";

export { UserDAO, RecordItemDAO, UserTagPO };

export const logger = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: [new transports.Console()],
});

export const sequelize = new Sequelize(process.env.APP_DATABASE_URL as string, {
  dialect: process.env.APP_DATABASE_DIALECT as Dialect,
  logging: (msg) => logger.info(msg),
  models: [UserDAO, UserTagPO, RecordItemDAO],
  define: {
    underscored: true,
  },
});
