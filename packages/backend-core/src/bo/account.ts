export class AccountBO {
  static TYPE = "Account" as const;
}

export const ACCOUNT_TYPES = ["Income", "Expense", "Asset", "Liability", "Equity"] as const;

export type AccountType = (typeof ACCOUNT_TYPES)[number];
