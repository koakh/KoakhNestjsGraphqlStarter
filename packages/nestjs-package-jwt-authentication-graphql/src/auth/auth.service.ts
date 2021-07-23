import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { UserServiceAbstract } from './abstracts';
import { FIND_ONE_BY_FIELD, AUTH_MODULE_OPTIONS } from './auth.constants';
import { EnvironmentVariables, GqlContextPayload, SignJwtTokenPayload } from './interfaces';
import { AuthModuleOptions } from './interfaces';
import { AccessToken } from './object-types/access-token.object-type';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
    private readonly jwtService: JwtService,
    // provided from AuthModule
    @Inject(AUTH_MODULE_OPTIONS)
    private readonly options: AuthModuleOptions,
    private userService: UserServiceAbstract,
  ) { 
    this.userService = this.options.userService;
  }
  // called by GqlLocalAuthGuard
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByField(FIND_ONE_BY_FIELD, username);
    if (user && user.password) {
      const authorized = this.bcryptValidate(pass, user.password);
      if (authorized) {
        // this will remove password from result leaving all the other properties
        const { password,...result } = user;
        // we could do a database lookup in our validate() method to extract more information about the user,
        // resulting in a more enriched user object being available in our Request
        return result;
      }
    }
    return null;
  }

  async signJwtToken(signPayload: SignJwtTokenPayload, options?: JwtSignOptions): Promise<AccessToken> {
    // note: we choose a property name of sub to hold our userId value to be consistent with JWT standards
    const payload = { username: signPayload.username, sub: signPayload.userId, roles: signPayload.roles };
    return {
      // generate JWT from a subset of the user object properties
      accessToken: this.jwtService.sign(payload, options),
    };
  }

  async signRefreshToken(signPayload: SignJwtTokenPayload, tokenVersion: number, options?: JwtSignOptions): Promise<AccessToken> {
    const payload = { username: signPayload.username, sub: signPayload.userId, roles: signPayload.roles, tokenVersion };
    return {
      // generate JWT from a subset of the user object properties
      accessToken: this.jwtService.sign(payload, { ...options, expiresIn: this.configService.get('refreshTokenExpiresIn') }),
    };
  }

  sendRefreshToken(res: Response, { accessToken }: AccessToken): void {
    res.cookie('jid', accessToken, {
      // prevent javascript access
      httpOnly: true,
    });
  }

  getJwtPayLoad(token: string): GqlContextPayload {
    return this.jwtService.verify(token);
  }

  bcryptValidate = (password: string, hashPassword: string): boolean => {
    return bcrypt.compareSync(password, hashPassword);
  }
}