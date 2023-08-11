import { Attribute, Default, PrimaryKey, Table, Version } from "@sequelize/core/decorators-legacy";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "@sequelize/core";

@Table.Abstract
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class DAO<M extends DAO<M> = DAO<any>> extends Model<
  InferAttributes<M>,
  InferCreationAttributes<M>
> {
  @Attribute(DataTypes.UUID)
  @PrimaryKey
  @Default(DataTypes.UUIDV4)
  declare id: CreationOptional<string>;

  @Version
  declare version: CreationOptional<number>;
}
