import { NestGraphqlAuthOptions } from './nest-graphql-auth-options.interface';

export interface NestGraphqlAuthOptionsFactory {
  createNestGraphqlAuthOptions():
    | Promise<NestGraphqlAuthOptions>
    | NestGraphqlAuthOptions;
}
