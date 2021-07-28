import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { NEST_GRAPHQL_AUTH_OPTIONS } from '../constants';
import { NestGraphqlAuthOptions } from '../interfaces';
import { JwtValidatePayload } from '../interfaces/jwt-validate-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(NEST_GRAPHQL_AUTH_OPTIONS)
    private readonly authModuleOptions: NestGraphqlAuthOptions,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // tip: to use and prevent `'super' must be called before accessing 'this' in the constructor of a derived class.ts(17009)`
      // remove this in super constructor
      secretOrKey: authModuleOptions.secret,
    });
  }

  async validate(payload: JwtValidatePayload) {
    return { userId: payload.sub, username: payload.username, roles: payload.roles };
  }
}
