import { createConfigurableDynamicRootModule } from '@golevelup/nestjs-modules';
import { CookieParserMiddleware } from '@nest-middlewares/cookie-parser';
import { Global, Inject, Injectable, MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserServiceAbstract } from './abstracts';
// import { PassportModule, PassportStrategy } from '@nestjs/passport';
// import { UserServiceAbstract } from './abstracts';
import { AUTH_MODULE_OPTIONS, USER_SERVICE } from './auth.constants';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { AuthModuleOptions } from './interfaces';
import { JwtStrategy, LocalStrategy } from './strategy';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { configuration } from '../common/config';

@Global()
@Module({
  imports: [
    // PassportModule,
    JwtModule.registerAsync({
      // imports: [ConfigModule],
      imports: [AuthModule],
      // useFactory: async (authModuleOptions: AuthModuleOptions) => {
      //   debugger;
      //   return {
      //     secret: authModuleOptions.secret,
      //     signOptions: {
      //       expiresIn: authModuleOptions.expiresIn,
      //     },
      //   }
      // },
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('accessTokenJwtSecret'),
        signOptions: {
          expiresIn: configService.get<string>('accessTokenExpiresIn'),
        }
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [
    AuthService, AuthResolver, LocalStrategy, JwtStrategy,
    // // trick we need to declare consumer app providers to be used by import modules like JwtModule
    // TODO You need to have a USER_SERVICE provider as a part of your AuthModule.
    // TODO It can be a factory that injects the AUTH_MODULE_OPTIONS and pulls out the service
    {
      provide: USER_SERVICE,
      useFactory: async (authModuleOptions: AuthModuleOptions) => {
        return authModuleOptions.userService;
      },
      inject: [AUTH_MODULE_OPTIONS],
    },
    {
      provide: AUTH_MODULE_OPTIONS,
      // useValue: AUTH_MODULE_OPTIONS,
      inject: [AUTH_MODULE_OPTIONS],
      useFactory: async (authModuleOptions: AuthModuleOptions) => {
        return authModuleOptions;
      },
    }
  ],
  exports: [
    AuthService,
    // trick we need to declare consumer app exports to be used by import modules like JwtModule
    {
      provide: USER_SERVICE,
      useFactory: async (authModuleOptions: AuthModuleOptions) => {
        return authModuleOptions.userService;
      },
      inject: [AUTH_MODULE_OPTIONS],
    },
    {
      provide: AUTH_MODULE_OPTIONS,
      useFactory: async (authModuleOptions: AuthModuleOptions) => {
        return authModuleOptions;
      },
      inject: [AUTH_MODULE_OPTIONS],
    }
  ],
})
export class AuthModule extends createConfigurableDynamicRootModule<
  AuthModule,
  AuthModuleOptions
>(AUTH_MODULE_OPTIONS) {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CookieParserMiddleware).forRoutes('/refresh-token');
  }
}

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       isGlobal: true,
//       load: [configuration],
//     }),
//     // not used because we use a class based strategy GqlAuthGuard
//     // configure the JwtModule using register(), passing configuration object, and register a default strategy
//     JwtModule.registerAsync({
//       imports: [ConfigModule],
//       useFactory: async (configService: ConfigService) => ({
//         secret: configService.get('accessTokenJwtSecret'),
//         signOptions: {
//           expiresIn: configService.get('accessTokenExpiresIn'),
//         },
//       }),
//       inject: [ConfigService],
//     }),
//   ],
//   controllers: [AuthController],
//   providers: [AuthService, AuthResolver, LocalStrategy, JwtStrategy],
//   exports: [AuthService],
// })

// export class AuthModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(CookieParserMiddleware).forRoutes('/refresh-token');
//   }

//   // dynamic module
//   static register(options: AuthModuleOptions): DynamicModule {
//     return {
//       module: AuthModule,
//       providers: [
//         AuthService,
//         // add useValue provide required to be injected service like in AuthService with
//         // @Inject(AUTH_MODULE_OPTIONS) options: AuthModuleOptions
//         {
//           provide: AUTH_MODULE_OPTIONS,
//           useValue: options,
//         },
//       ],
//       controllers: [AuthController],
//       exports: [AuthService],
//     };
//   }
// }
