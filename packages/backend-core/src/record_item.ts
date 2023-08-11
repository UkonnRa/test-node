import { DataTypes } from "@sequelize/core";
import { Attribute, NotNull, Table } from "@sequelize/core/decorators-legacy";
import { DAO } from "./dao";

@Table({ modelName: RecordItemDAO.TYPE })
export class RecordItemDAO extends DAO<RecordItemDAO> {
  static TYPE = "RecordItem" as const;

  @Attribute(DataTypes.DECIMAL)
  declare price?: number;

  @Attribute(DataTypes.DECIMAL)
  @NotNull()
  declare amount: number;
}
