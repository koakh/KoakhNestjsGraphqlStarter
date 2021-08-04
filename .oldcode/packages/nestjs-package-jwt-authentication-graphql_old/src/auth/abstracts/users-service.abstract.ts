import { CurrentUserPayload } from "../interfaces";
import { AuthUser } from "../types/auth-user.type";

export abstract class UserServiceAbstract {
  abstract findOneByField(field: string, value: string, currentUser?: CurrentUserPayload) : Promise<AuthUser | undefined>;
}
