import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { getEnvVariables as e } from '../common/env';
import JwtValidatePayload from './types/jwt-validate-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: e().accessTokenJwtSecret,
    });
  }

  async validate(payload: JwtValidatePayload) {
    return { userId: payload.sub, username: payload.username, roles: payload.roles };
  }
}
