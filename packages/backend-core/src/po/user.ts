import { Attribute, NotNull, Table } from "@sequelize/core/decorators-legacy";
import { DataTypes } from "@sequelize/core";
import { UserBO } from "../bo";
import { EntityPO } from "./po";

@Table({ modelName: UserBO.TYPE })
export class UserPO extends EntityPO<UserPO> {
  @Attribute(DataTypes.STRING)
  @NotNull
  declare name: string;

  @Attribute(DataTypes.BOOLEAN)
  @NotNull
  declare isAdmin: boolean;
}
