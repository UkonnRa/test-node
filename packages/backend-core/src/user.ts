import { DataTypes, HasManyGetAssociationsMixin, NonAttribute } from "@sequelize/core";
import { Attribute, NotNull, HasMany, Table } from "@sequelize/core/decorators-legacy";
import { DAO } from "./dao";
import { UserTagPO } from "./user_tag";

@Table({ modelName: UserDAO.TYPE })
export class UserDAO extends DAO<UserDAO> {
  static TYPE = "User" as const;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare firstName: string;

  @Attribute(DataTypes.STRING)
  declare lastName?: string;

  @HasMany(() => UserTagPO, {
    foreignKey: "userId",
    inverse: {
      as: "user",
    },
  })
  declare tags?: NonAttribute<UserTagPO[]>;

  declare getTags: HasManyGetAssociationsMixin<UserTagPO>;
}
