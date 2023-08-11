import { Table } from "@sequelize/core/decorators-legacy";
import { InferAttributes, InferCreationAttributes, Model } from "@sequelize/core";

@Table.Abstract
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class PO<M extends PO<M> = PO<any>> extends Model<
  InferAttributes<M>,
  InferCreationAttributes<M>
> {}
