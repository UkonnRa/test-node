import {
  Attribute,
  BelongsTo,
  HasMany,
  NotNull,
  PrimaryKey,
  Table,
} from "@sequelize/core/decorators-legacy";
import { RecordBO } from "../bo";
import { EntityPO, PO } from "./po";
import {
  BelongsToGetAssociationMixin,
  DataTypes,
  HasManyGetAssociationsMixin,
  NonAttribute,
} from "@sequelize/core";

@Table({ modelName: RecordTagPO.TYPE, timestamps: false })
export class RecordTagPO extends PO<RecordTagPO> {
  static TYPE = "RecordTagPO" as const;

  @BelongsTo(() => RecordPO, "recordId")
  declare record?: NonAttribute<RecordPO>;

  // This is the foreign key
  @Attribute(DataTypes.UUID)
  @NotNull()
  @PrimaryKey
  declare recordId: string;

  declare getRecord: BelongsToGetAssociationMixin<RecordPO>;

  @Attribute(DataTypes.STRING)
  @NotNull()
  @PrimaryKey
  declare tag: string;
}

@Table({ modelName: RecordBO.TYPE })
export class RecordPO extends EntityPO<RecordPO> {
  @Attribute(DataTypes.STRING)
  @NotNull
  declare name: string;

  @HasMany(() => RecordTagPO, {
    foreignKey: "recordId",
    inverse: {
      as: "record",
    },
  })
  declare tags?: NonAttribute<RecordTagPO[]>;

  declare getTags: HasManyGetAssociationsMixin<RecordTagPO>;
}
