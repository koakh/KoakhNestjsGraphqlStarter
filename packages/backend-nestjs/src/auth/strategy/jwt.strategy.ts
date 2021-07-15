import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { envVariables as e } from '../../common/config/env.config';
import { JwtValidatePayload } from '../interfaces/jwt-validate-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: e.accessTokenJwtSecret,
    });
  }

  async validate(payload: JwtValidatePayload) {
    return { userId: payload.sub, username: payload.username, roles: payload.roles };
  }
}
