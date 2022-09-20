import { Sequelize } from "sequelize-typescript";
import { ContainerEntity } from "../components/container/container.entity";
import { StatEntity } from "../components/stat/stat.entity";
import dotenv from "dotenv";

dotenv.config();
const { ENV } = process.env;

const connectionString = {
  prod: "./src/config/db.sqlite",
  test: "./src/config/testDb.sqlite",
};

const storage =
  ENV === "prod" ? connectionString[ENV] : connectionString["test"];

export const db = new Sequelize({
  dialect: "sqlite",
  storage,
});

db.addModels([ContainerEntity, StatEntity]);
