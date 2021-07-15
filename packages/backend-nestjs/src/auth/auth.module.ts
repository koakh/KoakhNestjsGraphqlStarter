import { CookieParserMiddleware } from '@nest-middlewares/cookie-parser';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { envVariables as e } from '../common/config/env.config';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy, LocalStrategy } from './strategy';

@Module({
  imports: [
    UserModule,
    // not used because we use a class based strategy GqlAuthGuard
    // configure the JwtModule using register(), passing configuration object, and register a default strategy
    // PassportModule.register({
    //   defaultStrategy: 'jwt',
    // }),
    JwtModule.register({
      secret: e.accessTokenJwtSecret,
      signOptions: { expiresIn: e.accessTokenExpiresIn },
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
}
