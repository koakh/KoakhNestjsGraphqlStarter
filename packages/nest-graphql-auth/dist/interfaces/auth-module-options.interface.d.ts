import { UserServiceAbstract } from "../abstracts";
import { CurrentUserPayload } from "./current-user-payload.interface";
export interface AuthModuleOptions {
    secret: string;
    expiresIn: string;
    adminUserPayload: CurrentUserPayload;
    userService: UserServiceAbstract;
}
