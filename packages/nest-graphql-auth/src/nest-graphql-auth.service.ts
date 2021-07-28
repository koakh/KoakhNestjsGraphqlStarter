import { Inject, Injectable, Logger } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { UserServiceAbstract } from './abstracts';
import { FIND_ONE_BY_FIELD, NEST_GRAPHQL_AUTH_OPTIONS } from './constants';
import { GqlContextPayload, NestGraphqlAuthOptions, SignJwtTokenPayload } from './interfaces';
import { AccessToken } from './object-types';

interface INestGraphqlAuthService {
  test(): Promise<any>;
}

@Injectable()
export class NestGraphqlAuthService implements INestGraphqlAuthService {
  private readonly logger: Logger;
  private readonly userService: UserServiceAbstract;

  constructor(
    @Inject(NEST_GRAPHQL_AUTH_OPTIONS)
    private authModuleOptions: NestGraphqlAuthOptions,
    private readonly jwtService: JwtService,
  ) {
    this.userService = authModuleOptions.userService;
    this.logger = new Logger('NestGraphqlAuthService');
    this.logger.log(`Options: ${JSON.stringify(this.authModuleOptions)}`);
  }

  // TODO remove
  async test(): Promise<any> {
    return 'Hello from NestGraphqlAuthModule!';
  }

  // called by GqlLocalAuthGuard
  async validateUser(username: string, pass: string): Promise<any> {
    debugger;
    Logger.log(this.userService);
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

  bcryptValidate = (password: string, hashPassword: string): boolean => {
    return bcrypt.compareSync(password, hashPassword);
  }
}