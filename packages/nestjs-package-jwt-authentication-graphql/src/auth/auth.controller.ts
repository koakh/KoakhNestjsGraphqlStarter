import { Controller, HttpStatus, Inject, Post, Request, Response } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
// import { User } from '../user/object-types';
import { AuthStore } from './auth.store';
import { UserServiceAbstract } from './abstracts';
import { AUTH_MODULE_OPTIONS, FIND_ONE_BY_FIELD } from './auth.constants';
import { AuthService } from './auth.service';
import { AuthModuleOptions, EnvironmentVariables, GqlContextPayload, SignJwtTokenPayload } from './interfaces';
import { AccessToken } from './object-types/access-token.object-type';
import { AuthUser } from './types';

@Controller()
export class AuthController {
  // private membeers
  private userService: UserServiceAbstract;
  private authStore: AuthStore;

  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    // provided from AuthModule
    @Inject(AUTH_MODULE_OPTIONS)
    private readonly options: AuthModuleOptions,
  ) {
    this.userService = this.options.userService;
    // init authStore inMemory refreshToken versions
    this.authStore = new AuthStore();
  }

  // for security purposes, refreshToken cookie only works in this specific route,
  // to request a new accessToken, this prevent /graphql to works with cookie

  @Post('/refresh-token')
  async refreshToken(
    @Request() req,
    @Response() res,
  ): Promise<any> {
    // Logger.log('headers', JSON.stringify(req.headers, undefined, 2));
    // Logger.log('cookies', JSON.stringify(req.cookies, undefined, 2));
    const invalidPayload = () => res.status(HttpStatus.UNAUTHORIZED).send({ valid: false, accessToken: '' });
    // get jid token from cookies
    const token: string = (req.cookies && req.cookies.jid) ? req.cookies.jid : null;
    // check if jid token is present
    if (!token) {
      return invalidPayload();
    }

    let payload: GqlContextPayload;
    try {
      // warn this seems to use old way of send secret, in new versions we must send with `this.jwtService.verify(token, {secret: e.refreshTokenJwtSecret})`
      payload = this.jwtService.verify(token, this.configService.get('refreshTokenJwtSecret'));
    } catch (error) {
      // Logger.log(error);
      return invalidPayload();
    }

    // token is valid, send back accessToken
    const user: AuthUser = await this.userService.findOneByField(FIND_ONE_BY_FIELD, payload.username);
    // check jid token
    if (!user) {
      return invalidPayload();
    }

    // check inMemory tokenVersion
    const tokenVersion: number = this.authStore.getTokenVersion(user.username);
    if (tokenVersion !== payload.tokenVersion) {
      return invalidPayload();
    }

    // refresh the refreshToken on accessToken, this way we extended/reset refreshToken validity to default value
    const signJwtTokenDto: SignJwtTokenPayload = { username: user.username, userId: user.id, roles: user.roles };
    // we don't increment tokenVersion here, only when we login, this way refreshToken is always valid until we login again
    const refreshToken: AccessToken = await this.authService.signRefreshToken(signJwtTokenDto, tokenVersion);
    // send refreshToken in response/setCookie
    this.authService.sendRefreshToken(res, refreshToken);
    const { accessToken }: AccessToken = await this.authService.signJwtToken(signJwtTokenDto);
    res.send({ valid: true, accessToken });
  }
}
