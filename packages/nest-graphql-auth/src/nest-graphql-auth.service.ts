import { Inject, Injectable, Logger } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { UserServiceAbstract } from './abstracts';
import { FIND_ONE_BY_FIELD, NEST_GRAPHQL_AUTH_OPTIONS, NEST_GRAPHQL_USER_SERVICE } from './constants';
import { GqlContextPayload, NestGraphqlAuthOptions, SignJwtTokenPayload } from './interfaces';
import { AuthStore } from './nest-graphql-auth.store';
import { AccessToken } from './object-types';

interface INestGraphqlAuthService {
  validateUser(username: string, pass: string):  Promise<any>;
  signJwtToken(signPayload: SignJwtTokenPayload, options?: JwtSignOptions): Promise<AccessToken>;
  signRefreshToken(signPayload: SignJwtTokenPayload, tokenVersion: number, options?: JwtSignOptions): Promise<AccessToken>;
  sendRefreshToken(res: Response, { accessToken }: AccessToken): void;
  getJwtPayLoad(token: string): GqlContextPayload;
  bcryptValidate(password: string, hashPassword: string): boolean;
}

@Injectable()
export class NestGraphqlAuthService implements INestGraphqlAuthService {
  private readonly logger: Logger;
  // public membeers
  authStore: AuthStore;

  constructor(
    private readonly jwtService: JwtService,
    @Inject(NEST_GRAPHQL_AUTH_OPTIONS)
    private authModuleOptions: NestGraphqlAuthOptions,
    @Inject(NEST_GRAPHQL_USER_SERVICE)
    private readonly userService: UserServiceAbstract,
  ) {
    // init authStore inMemory refreshToken versions
    this.authStore = new AuthStore();
    // log
    this.logger = new Logger('NestGraphqlAuthService');
    this.logger.log(`Options: ${JSON.stringify(this.authModuleOptions)}`);
  }

  // called by GqlLocalAuthGuard
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByField(FIND_ONE_BY_FIELD, username);
    Logger.log(user);
    if (user && user.password) {
      const authorized = this.bcryptValidate(pass, user.password);
      Logger.log(`authorized:${authorized}`);
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
      accessToken: this.jwtService.sign(payload, { ...options, expiresIn: this.authModuleOptions.expiresIn }),
    };
  }

  sendRefreshToken(res: Response, { accessToken }: AccessToken): void {
    // res cookie require import { Response } from 'express';
    res.cookie('jid', accessToken, {
      // prevent javascript access
      httpOnly: true,
    });
  }

  getJwtPayLoad(token: string): GqlContextPayload {
    return this.jwtService.verify(token);
  }

  bcryptValidate(password: string, hashPassword: string): boolean {
    return bcrypt.compareSync(password, hashPassword);
  }
}