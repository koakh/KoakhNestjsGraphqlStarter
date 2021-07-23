import { CookieParserMiddleware } from '@nest-middlewares/cookie-parser';
import { DynamicModule, MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy, LocalStrategy } from './strategy';
import { configuration } from '../common/config';
import { AUTH_MODULE_OPTIONS } from './auth.constants';
import { AuthModuleOptions } from './interfaces';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    // not used because we use a class based strategy GqlAuthGuard
    // configure the JwtModule using register(), passing configuration object, and register a default strategy
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('accessTokenJwtSecret'),
        signOptions: {
          expiresIn: configService.get('accessTokenExpiresIn'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthResolver, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})

export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CookieParserMiddleware).forRoutes('/refresh-token');
  }

  // dynamic module
  static register(options: AuthModuleOptions): DynamicModule {
    return {
      module: AuthModule,
      providers: [
        AuthService,
        // add useValue provide required to be injected service like in AuthService with
        // @Inject(AUTH_MODULE_OPTIONS) options: AuthModuleOptions
        {
          provide: AUTH_MODULE_OPTIONS,
          useValue: options,
        },
      ],
      controllers: [AuthController],
      exports: [AuthService],
    };
  }
}
