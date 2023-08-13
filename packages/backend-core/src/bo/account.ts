import { BO, BOProps } from "./bo";
import { AccountPO, AccountTagPO, JournalPO, JournalTagPO, JournalUserPO } from "../po";

type AccountProps = BOProps & {
  name: string;

  description: string;

  unit: string;

  journalId: string;

  tags: string[];

  type: AccountType;
};

export class AccountBO extends BO {
  static TYPE = "Account" as const;

  name: string;

  description: string;

  unit: string;

  journalId: string;

  tags: string[];

  type: AccountType;

  constructor(props: AccountProps) {
    super(props);
    this.name = props.name;
    this.description = props.description;
    this.unit = props.unit;
    this.journalId = props.journalId;
    this.tags = props.tags;
    this.type = props.type;
  }

  toPO(): [AccountPO, AccountTagPO[]] {
    return [
      AccountPO.build(this),
      this.tags.map((tag) =>
        AccountTagPO.build({
          accountId: this.id,
          tag: tag,
        }),
      ),
    ];
  }

  static fromPO([account, tags]: [AccountPO, AccountTagPO[]]): AccountBO {
    return new AccountBO({
      ...account,
      tags: tags.filter((tag) => tag.accountId === account.id).map((tag) => tag.tag),
    });
  }
}

export const ACCOUNT_TYPES = ["Income", "Expense", "Asset", "Liability", "Equity"] as const;

export type AccountType = (typeof ACCOUNT_TYPES)[number];
