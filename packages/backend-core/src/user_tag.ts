import { BelongsToGetAssociationMixin, DataTypes, NonAttribute } from "@sequelize/core";
import {
  Attribute,
  BelongsTo,
  NotNull,
  PrimaryKey,
  Table,
} from "@sequelize/core/decorators-legacy";
import { PO } from "./po";
import { UserDAO } from "./user";

@Table({ modelName: UserTagPO.TYPE })
export class UserTagPO extends PO<UserTagPO> {
  static TYPE = "UserTag" as const;

  @BelongsTo(() => UserDAO, "userId")
  declare user?: NonAttribute<UserDAO>;

  // This is the foreign key
  @Attribute(DataTypes.UUID)
  @NotNull()
  @PrimaryKey
  declare userId: string;

  @Attribute(DataTypes.STRING)
  @NotNull()
  @PrimaryKey
  declare tag: string;

  declare getUser: BelongsToGetAssociationMixin<UserDAO>;
}
