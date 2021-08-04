import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { NEST_GRAPHQL_AUTH_OPTIONS } from './auth.constants';
import { createNestGraphqlAuthModuleProviders, createNestGraphqlAuthProviders } from './auth.providers';
import { NestGraphqlAuthResolver } from './auth.resolver';
import { NestGraphqlAuthService } from './auth.service';
import { NestGraphqlAuthAsyncOptions, NestGraphqlAuthOptions, NestGraphqlAuthOptionsFactory } from './interfaces';

@Global()
@Module({
  providers: [
    NestGraphqlAuthService,
    NestGraphqlAuthResolver,
    ...createNestGraphqlAuthModuleProviders
  ],
  exports: [
    NestGraphqlAuthService,
    ...createNestGraphqlAuthModuleProviders
  ],
  imports: [
    JwtModule.registerAsync({
      useFactory: async (authModuleOptions: NestGraphqlAuthOptions) => ({
        secret: authModuleOptions.secret,
        signOptions: {
          expiresIn: authModuleOptions.expiresIn,
        }
      }),
      inject: [NEST_GRAPHQL_AUTH_OPTIONS],
    }),
  ],
})

export class NestGraphqlAuthModule {
  /**
   * Registers a configured NestGraphqlAuth Module for import into the current module
   */
  public static register(
    options: NestGraphqlAuthOptions,
  ): DynamicModule {
    return {
      module: NestGraphqlAuthModule,
      providers: createNestGraphqlAuthProviders(options),
    };
  }

  /**
   * Registers a configured NestGraphqlAuth Module for import into the current module
   * using dynamic options (factory, etc)
   */
  public static registerAsync(
    options: NestGraphqlAuthAsyncOptions,
  ): DynamicModule {
    return {
      module: NestGraphqlAuthModule,
      providers: [
        ...this.createProviders(options),
      ],
    };
  }

  private static createProviders(
    options: NestGraphqlAuthAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createOptionsProvider(options)];
    }

    return [
      this.createOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createOptionsProvider(
    options: NestGraphqlAuthAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: NEST_GRAPHQL_AUTH_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    // For useExisting...
    return {
      provide: NEST_GRAPHQL_AUTH_OPTIONS,
      useFactory: async (optionsFactory: NestGraphqlAuthOptionsFactory) =>
        await optionsFactory.createNestGraphqlAuthOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
