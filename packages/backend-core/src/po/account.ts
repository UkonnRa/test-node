import {
  Attribute,
  BelongsTo,
  HasMany,
  NotNull,
  PrimaryKey,
  Table,
} from "@sequelize/core/decorators-legacy";
import { AccountBO, AccountType } from "../bo";
import { EntityPO, PO } from "./po";
import {
  BelongsToGetAssociationMixin,
  DataTypes,
  HasManyGetAssociationsMixin,
  NonAttribute,
} from "@sequelize/core";
import { JournalPO } from "./journal";

@Table({ modelName: AccountTagPO.TYPE, timestamps: false })
export class AccountTagPO extends PO<AccountTagPO> {
  static TYPE = "AccountTag" as const;

  @BelongsTo(() => AccountPO, "accountId")
  declare account?: NonAttribute<AccountPO>;

  // This is the foreign key
  @Attribute(DataTypes.UUID)
  @NotNull()
  @PrimaryKey
  declare accountId: string;

  declare getAccount: BelongsToGetAssociationMixin<AccountPO>;

  @Attribute(DataTypes.STRING)
  @NotNull()
  @PrimaryKey
  declare tag: string;
}

@Table({ modelName: AccountBO.TYPE })
export class AccountPO extends EntityPO<AccountPO> {
  @Attribute(DataTypes.STRING)
  @NotNull
  declare name: string;

  @BelongsTo(() => JournalPO, "journalId")
  declare journal?: NonAttribute<JournalPO>;

  // This is the foreign key
  @Attribute(DataTypes.UUID)
  @NotNull
  declare journalId: string;

  declare getJournal: BelongsToGetAssociationMixin<JournalPO>;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare type: AccountType;

  @HasMany(() => AccountTagPO, {
    foreignKey: "accountId",
    inverse: {
      as: "account",
    },
  })
  declare tags?: NonAttribute<AccountTagPO[]>;

  declare getTags: HasManyGetAssociationsMixin<AccountTagPO>;
}
