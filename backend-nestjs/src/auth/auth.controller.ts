import { Controller, HttpStatus, Post, Request, Response } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import SignJwtTokenPayload from 'src/common/types/sign-jwt-token-payload';
import { getEnvVariables as e } from '../common/env';
import { User } from '../user/models';
import { GqlContextPayload } from '../types';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { AccessToken } from './models';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) { }
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
      // tslint:disable-next-line: max-line-length
      // warn this seems to use old way of send secret, in new versions we must send with `this.jwtService().verify(token, {secret: e().refreshTokenJwtSecret})`
      payload = this.jwtService.verify(token, {secret: e().refreshTokenJwtSecret});
    } catch (error) {
      // Logger.log(error);
      return invalidPayload();
    }

    // token is valid, send back accessToken
    const user: User = await this.userService.findOneByUsername(payload.username);
    // check jid token
    if (!user) {
      return invalidPayload();
    }

    // check inMemory tokenVersion
    const tokenVersion: number = this.userService.usersStore.getTokenVersion(user.username);
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
