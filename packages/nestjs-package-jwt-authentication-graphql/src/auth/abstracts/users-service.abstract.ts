import { AuthUser } from "../types/auth-user.type";

export abstract class UserServiceAbstract {
  abstract findOneByField(field: string, value: string) : Promise<AuthUser | undefined>;
}
