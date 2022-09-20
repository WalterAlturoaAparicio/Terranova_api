import { AutoIncrement, Column, PrimaryKey, Table, Model } from "sequelize-typescript";
import { container, containerInput } from "./container.interface";

@Table({
  tableName: "container",
  modelName: "container",
  timestamps: false
})
export class ContainerEntity extends Model<container, containerInput> implements container {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Column
  name!: string;

  @Column
  transportCost!: number;

  @Column
  containerPrice!: number;
}
