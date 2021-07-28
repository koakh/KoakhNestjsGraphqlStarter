import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthModuleOptions, EnvironmentVariables } from '../interfaces';
import { JwtValidatePayload } from '../interfaces/jwt-validate-payload.interface';
import { AUTH_MODULE_OPTIONS } from '../auth.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    // TODO
    private readonly configService: ConfigService<EnvironmentVariables>,
    // @Inject(AUTH_MODULE_OPTIONS)
    // private readonly authModuleOptions: AuthModuleOptions,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // tip: to use and prevent `'super' must be called before accessing 'this' in the constructor of a derived class.ts(17009)`
      // remove this in super constructor
      // TODO
      secretOrKey: configService.get('accessTokenJwtSecret'),
      // secretOrKey: authModuleOptions.secret,
    });
  }

  async validate(payload: JwtValidatePayload) {
    return { userId: payload.sub, username: payload.username, roles: payload.roles };
  }
}
