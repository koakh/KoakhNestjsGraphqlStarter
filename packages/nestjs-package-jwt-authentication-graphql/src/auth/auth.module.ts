import { createConfigurableDynamicRootModule } from '@golevelup/nestjs-modules';
import { CookieParserMiddleware } from '@nest-middlewares/cookie-parser';
import { Inject, Injectable, MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserServiceAbstract } from './abstracts';
// import { PassportModule, PassportStrategy } from '@nestjs/passport';
// import { UserServiceAbstract } from './abstracts';
import { AUTH_MODULE_OPTIONS, USER_SERVICE } from './auth.constants';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { AuthModuleOptions } from './interfaces';
import { JwtStrategy, LocalStrategy } from './strategy';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { configuration } from '../common/config';


@Module({
  imports: [
    // PassportModule,
    JwtModule.registerAsync({
      // imports: [ConfigModule],
      imports: [AuthModule],
      // useFactory: async (configService: ConfigService) => ({
      useFactory: async (authModuleOptions: AuthModuleOptions) => {
        return {
          secret: authModuleOptions.secret,
          signOptions: {
            expiresIn: authModuleOptions.secret,
          },
        }
      },
      inject: [AUTH_MODULE_OPTIONS, USER_SERVICE],
    }),
  ],
  controllers: [
    AuthController],
  providers: [
    AuthService, AuthResolver, LocalStrategy, JwtStrategy,
    // trick we need to declare consumer app providers to be used by import modules like JwtModule
    {
      // TODO
      provide: USER_SERVICE,
      // always test with a value first
      useValue: USER_SERVICE
      // useExisting: USER_SERVICE
      // useFactory: async (userService: UserServiceAbstract) => {
      //   return userService;
      // },
      // // this is the trick to use dynamic provider and have
      // inject: [USER_SERVICE],
      // imports: [USER_SERVICE]
    },
    {
      provide: AUTH_MODULE_OPTIONS,
      // always test with a value first
      useValue: AUTH_MODULE_OPTIONS
    }
  ],
  exports: [
    AuthService,
    // trick we need to declare consumer app exports to be used by import modules like JwtModule
    {
      // TODO
      provide: USER_SERVICE,
      // always test with a value first
      useValue: USER_SERVICE
      // useExisting: USER_SERVICE
      // useFactory: async (userService: UserServiceAbstract) => {
      //   return userService;
      // },
      // // this is the trick to use dynamic provider and have
      // inject: [USER_SERVICE],
      // imports: [AuthModule]
    },
    {
      // TODO
      provide: AUTH_MODULE_OPTIONS,
      // always test with a value first
      useValue: AUTH_MODULE_OPTIONS
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
