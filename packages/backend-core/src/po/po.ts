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
export class PO<M extends PO<M> = PO<any>> extends Model<
  InferAttributes<M>,
  InferCreationAttributes<M>
> {}

@Table.Abstract
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class EntityPO<M extends EntityPO<M> = EntityPO<any>> extends PO<M> {
  @Attribute(DataTypes.UUID)
  @PrimaryKey
  @Default(DataTypes.UUIDV4)
  declare id: CreationOptional<string>;

  @Version
  declare version: CreationOptional<number>;
}
