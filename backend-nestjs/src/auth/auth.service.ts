import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { SignOptions } from 'jsonwebtoken';
import SignJwtTokenPayload from '../common/types/sign-jwt-token-payload';
import { getEnvVariables as e } from '../common/env';
import { GqlContextPayload } from '../types';
import { UserService } from '../user/user.service';
import AccessToken from './types/access-token';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }
  // called by GqlLocalAuthGuard
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByUsername(username);
    if (user) {
      const authorized = this.bcryptValidate(pass, user.password);
      if (authorized) {
        // this will remove password from result leaving all the other properties
        const { password, ...result } = user;
        // we could do a database lookup in our validate() method to extract more information about the user,
        // resulting in a more enriched user object being available in our Request
        return result;
      }
    }
    return null;
  }

  async signJwtToken(signPayload: SignJwtTokenPayload, options?: SignOptions): Promise<AccessToken> {
    // note: we choose a property name of sub to hold our userId value to be consistent with JWT standards
    const payload = { username: signPayload.username, sub: signPayload.userId, roles: signPayload.roles };
    return {
      // generate JWT from a subset of the user object properties
      accessToken: this.jwtService.sign(payload, options),
    };
  }

  async signRefreshToken(signPayload: SignJwtTokenPayload, tokenVersion: number, options?: SignOptions): Promise<AccessToken> {
    const payload = { username: signPayload.username, sub: signPayload.userId, roles: signPayload.roles, tokenVersion };
    return {
      // generate JWT from a subset of the user object properties
      accessToken: this.jwtService.sign(payload, {
        ...options,
        // require to use refreshTokenJwtSecret
        secret: e().refreshTokenJwtSecret,
        expiresIn: e().refreshTokenExpiresIn,
      }),
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
