import { UserPO } from "../po";
import { BO, BOProps } from "./bo";

type UserProps = BOProps & {
  name: string;
  isAdmin: boolean;
};

export class UserBO extends BO {
  static TYPE = "User" as const;

  name: string;

  isAdmin: boolean;

  constructor(props: UserProps) {
    super(props);
    this.name = props.name;
    this.isAdmin = props.isAdmin;
  }

  toPO(): UserPO {
    return UserPO.build(this, { raw: true });
  }

  static fromPO(po: UserPO): UserBO {
    return new UserBO(po);
  }
}
