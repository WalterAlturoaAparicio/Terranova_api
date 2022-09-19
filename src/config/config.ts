import { Sequelize } from "sequelize-typescript";
import { ContainerEntity } from "../container/container.entity";
import { StatEntity } from "../stat/stat.entity";

export const db = new Sequelize({
  dialect: "sqlite",
  storage: "./src/config/db.sqlite",
});
db.addModels([ContainerEntity, StatEntity])