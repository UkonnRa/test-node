import { BO, BOProps } from "./bo";
import { JournalPO, JournalTagPO, JournalUserPO } from "../po";

type JournalProps = BOProps & {
  name: string;

  description: string;

  unit: string;

  adminIds: string[];

  memberIds: string[];

  tags: string[];
};

export class JournalBO extends BO {
  static TYPE = "Journal" as const;

  name: string;

  description: string;

  unit: string;

  adminIds: string[];

  memberIds: string[];

  tags: string[];

  constructor(props: JournalProps) {
    super(props);
    this.name = props.name;
    this.description = props.description;
    this.unit = props.unit;
    this.adminIds = props.adminIds;
    this.memberIds = props.memberIds;
    this.tags = props.tags;
  }

  toPO(): [JournalPO, JournalTagPO[], JournalUserPO[]] {
    return [
      JournalPO.build(this),
      this.tags.map((tag) =>
        JournalTagPO.build({
          journalId: this.id,
          tag: tag,
        }),
      ),
      [
        ...this.adminIds.map((id) =>
          JournalUserPO.build({
            journalId: this.id,
            userId: id,
            isAdmin: true,
          }),
        ),
        ...this.memberIds.map((id) =>
          JournalUserPO.build({
            journalId: this.id,
            userId: id,
            isAdmin: false,
          }),
        ),
      ],
    ];
  }

  static fromPO([journal, tags, users]: [JournalPO, JournalTagPO[], JournalUserPO[]]): JournalBO {
    return new JournalBO({
      ...journal,
      adminIds: users
        .filter((user) => user.isAdmin && user.journalId === journal.id)
        .map((user) => user.userId),
      memberIds: users
        .filter((user) => !user.isAdmin && user.journalId === journal.id)
        .map((user) => user.userId),
      tags: tags.filter((tag) => tag.journalId === journal.id).map((tag) => tag.tag),
    });
  }
}
