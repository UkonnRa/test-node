import {
  Attribute,
  BelongsTo,
  HasMany,
  NotNull,
  PrimaryKey,
  Table,
  BelongsToMany,
} from "@sequelize/core/decorators-legacy";
import { JournalBO } from "../bo";
import { EntityPO, PO } from "./po";
import {
  BelongsToGetAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  DataTypes,
  HasManyGetAssociationsMixin,
  NonAttribute,
} from "@sequelize/core";
import { UserPO } from "./user";

@Table({ modelName: JournalTagPO.TYPE, timestamps: false })
export class JournalTagPO extends PO<JournalTagPO> {
  static TYPE = "JournalTag" as const;

  @BelongsTo(() => JournalPO, "journalId")
  declare journal?: NonAttribute<JournalPO>;

  // This is the foreign key
  @Attribute(DataTypes.UUID)
  @NotNull()
  @PrimaryKey
  declare journalId: string;

  declare getJournal: BelongsToGetAssociationMixin<JournalPO>;

  @Attribute(DataTypes.STRING)
  @NotNull()
  @PrimaryKey
  declare tag: string;
}

@Table({ modelName: JournalUserPO.TYPE, timestamps: false })
export class JournalUserPO extends PO<JournalUserPO> {
  static TYPE = "JournalUser" as const;

  @BelongsTo(() => JournalPO, "journalId")
  declare journal?: NonAttribute<JournalPO>;

  // This is the foreign key
  @Attribute(DataTypes.UUID)
  @NotNull()
  @PrimaryKey
  declare journalId: string;

  declare getJournal: BelongsToGetAssociationMixin<JournalPO>;

  @BelongsTo(() => UserPO, "userId")
  declare user?: NonAttribute<UserPO>;

  @Attribute(DataTypes.UUID)
  @NotNull()
  @PrimaryKey
  declare userId: string;

  declare getUser: BelongsToGetAssociationMixin<UserPO>;

  @Attribute(DataTypes.BOOLEAN)
  @NotNull()
  declare isAdmin: boolean;
}

@Table({ modelName: JournalBO.TYPE })
export class JournalPO extends EntityPO<JournalPO> {
  @Attribute(DataTypes.STRING)
  @NotNull
  declare name: string;

  @BelongsToMany(() => UserPO, {
    through: {
      model: JournalUserPO,
      scope: { isAdmin: true },
    },
  })
  declare admins?: NonAttribute<UserPO[]>;

  declare getAdmins: BelongsToManyGetAssociationsMixin<UserPO>;

  @BelongsToMany(() => UserPO, {
    through: {
      model: JournalUserPO,
      scope: { isAdmin: false },
    },
  })
  declare members?: NonAttribute<UserPO[]>;

  declare getMembers: BelongsToManyGetAssociationsMixin<UserPO>;

  @HasMany(() => JournalTagPO, {
    foreignKey: "journalId",
    inverse: {
      as: "journal",
    },
  })
  declare tags?: NonAttribute<JournalTagPO[]>;

  declare getTags: HasManyGetAssociationsMixin<JournalTagPO>;
}
