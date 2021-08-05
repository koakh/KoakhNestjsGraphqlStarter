import { DynamicModule, Global, Module, Provider } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { NEST_GRAPHQL_AUTH_OPTIONS } from './auth.constants';
import { createNestGraphqlAuthModuleProviders, createNestGraphqlAuthProviders } from './auth.providers';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { NestGraphqlAuthAsyncOptions, NestGraphqlAuthOptions, NestGraphqlAuthOptionsFactory } from './interfaces';
import { JwtStrategy } from './strategy';

@Global()
@Module({
  providers: [
    AuthService,
    AuthResolver,
    // require to add JwtStrategy to fix to `Unknown authentication strategy "jwt"`
    JwtStrategy,
    ...createNestGraphqlAuthModuleProviders,
  ],
  exports: [
    AuthService,
    ...createNestGraphqlAuthModuleProviders,
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

export class AuthModule {
  /**
   * Registers a configured NestGraphqlAuth Module for import into the current module
   */
  public static register(
    options: NestGraphqlAuthOptions,
  ): DynamicModule {
    return {
      module: AuthModule,
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
      module: AuthModule,
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
