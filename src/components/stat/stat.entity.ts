import {
  AutoIncrement,
  Column,
  PrimaryKey,
  Table,
  Model,
} from "sequelize-typescript";
import { stat, statInput } from "./stat.interface";

@Table({
  tableName: "stat",
  modelName: "stat",
})
export class StatEntity extends Model<stat, statInput> implements stat {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column
  budget!: number;

  @Column
  containersDispatched!: number;

  @Column
  containersNotDispatched!: number;
}
