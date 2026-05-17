import "reflect-metadata";
import { DataSource } from "typeorm";
import { env } from "./config/env.js";
import { Transaction } from "./entities/Transaction.js";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,

  entities: [Transaction],

  synchronize: true,

  logging: false,
});
