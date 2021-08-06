import { AuthOptions } from './auth-options.interface';

export interface AuthOptionsFactory {
  createNestGraphqlAuthOptions():
    | Promise<AuthOptions>
    | AuthOptions;
}
