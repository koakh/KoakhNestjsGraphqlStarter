import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtValidatePayload } from '../interfaces/jwt-validate-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,    
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // tip: to use and prevent `'super' must be called before accessing 'this' in the constructor of a derived class.ts(17009)`
      // remove this in super constructor
      secretOrKey: configService.get('jwt.accessTokenJwtSecret'),
    });
  }

  async validate(payload: JwtValidatePayload) {
    return { userId: payload.sub, username: payload.username, roles: payload.roles };
  }
}
