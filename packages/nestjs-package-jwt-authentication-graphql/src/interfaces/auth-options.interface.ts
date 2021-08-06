import { UserServiceAbstract } from "../abstracts";
import { CurrentUserPayload } from "./current-user-payload.interface";

export interface AuthOptions {
  secret: string;
  expiresIn: string;
  refreshTokenJwtSecret: string;
  refreshTokenExpiresIn: string;
  adminUserPayload: CurrentUserPayload;
  userService: UserServiceAbstract;
}
