import { NestGraphqlAuthOptions } from './interfaces';
import { NEST_GRAPHQL_AUTH_OPTIONS, NEST_GRAPHQL_USER_SERVICE } from './auth.constants';

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

// TODO the trick to inject into JwtModule is using this factory
// after this we can use `inject: [NEST_GRAPHQL_AUTH_OPTIONS]`
// getted from https://dev.to/nestjs/build-a-nestjs-module-for-knex-js-or-other-resource-based-libraries-in-5-minutes-12an
export const createNestGraphqlAuthModuleProviders = [
  {
    provide: NEST_GRAPHQL_AUTH_OPTIONS,
    useFactory: async (authModuleOptions: NestGraphqlAuthOptions) => {
      return authModuleOptions;
    },
    inject: [NEST_GRAPHQL_AUTH_OPTIONS],
  },
  {
    provide: NEST_GRAPHQL_USER_SERVICE,
    useFactory: async (authModuleOptions: NestGraphqlAuthOptions) => {
      return authModuleOptions.userService;
    },
    inject: [NEST_GRAPHQL_AUTH_OPTIONS],
  }
];
