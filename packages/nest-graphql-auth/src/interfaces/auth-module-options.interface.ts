import { UserServiceAbstract } from "../abstracts";
import { CurrentUserPayload } from "./current-user-payload.interface";

export interface AuthModuleOptions {
  // TODO
  // useClass?: any,
  secret: string;
  expiresIn: string;
  adminUserPayload: CurrentUserPayload;
  userService: UserServiceAbstract;
}