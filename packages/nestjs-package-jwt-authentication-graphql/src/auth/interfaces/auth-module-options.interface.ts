import { UserServiceAbstract } from "../abstracts";

export interface AuthModuleOptions {
  userService: UserServiceAbstract;
  config: {
    folder: string
  }
}