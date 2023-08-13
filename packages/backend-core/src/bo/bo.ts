import { v4 } from "uuid";

export abstract class BO {
  id: string;

  version: number;

  createdAt: Date;

  updatedAt: Date;

  protected constructor(props: BOProps) {
    this.id = props.id ?? v4();
    this.version = props.version ?? 0;
    this.createdAt = props.createdAt ?? new Date();
    this.updatedAt = props.updatedAt ?? new Date();
  }
}

export type BOProps = {
  id?: string;
  version?: number;
  createdAt?: Date;
  updatedAt?: Date;
};
