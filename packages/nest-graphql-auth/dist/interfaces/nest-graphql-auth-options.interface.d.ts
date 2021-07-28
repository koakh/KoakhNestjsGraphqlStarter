import { UserServiceAbstract } from "../abstracts";
import { CurrentUserPayload } from "./current-user-payload.interface";
export interface NestGraphqlAuthOptions {
    secret: string;
    expiresIn: string;
    adminUserPayload: CurrentUserPayload;
    userService: UserServiceAbstract;
}
