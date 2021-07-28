import { NestGraphqlAuthOptions } from './interfaces';
import { NEST_GRAPHQL_AUTH_OPTIONS } from './constants';

export function createNestGraphqlAuthProviders(
  options: NestGraphqlAuthOptions,
) {
  return [
    {
      provide: NEST_GRAPHQL_AUTH_OPTIONS,
      useValue: options,
    },
  ];
}
