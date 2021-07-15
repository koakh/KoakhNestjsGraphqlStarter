import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { appConstants as c } from '../common/app/constants';
import { SubscriptionEvent } from '../common/enums';
import { User } from '../user/object-types';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { CurrentUser, Roles } from './decorators';
import { UserRoles } from './enums';
import { GqlLocalAuthGuard, GqlRolesGuard } from './guards';
import { LoginUserInput } from './input-types';
import { CurrentUserPayload, GqlContext, SignJwtTokenPayload } from './interfaces';
import { AccessToken, UserLoginResponse } from './object-types';

const pubSub = new PubSub();

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) { }

  @UseGuards(GqlLocalAuthGuard)
  @Mutation(returns => UserLoginResponse)
  async userLogin(
    @Args('loginUserData') loginUserData: LoginUserInput,
    @Context() { res, payload }: GqlContext,
  ): Promise<UserLoginResponse> {
    // publish userLogged subscription
    pubSub.publish(SubscriptionEvent.userLogged, { [SubscriptionEvent.userLogged]: loginUserData.username });
    // get user
    const user: User = await this.userService.findOneByField('username', loginUserData.username, c.CURRENT_USER_ADMIN_ROLE);
    // accessToken: add some user data to it, like id and roles
    const signJwtTokenDto: SignJwtTokenPayload = { ...loginUserData, userId: user.id, roles: user.roles };
    const { accessToken } = await this.authService.signJwtToken(signJwtTokenDto);
    // assign jwt Payload to context
    payload = this.authService.getJwtPayLoad(accessToken);
    // get incremented tokenVersion
    const tokenVersion = this.userService.usersStore.incrementTokenVersion(loginUserData.username);
    // refreshToken
    const refreshToken: AccessToken = await this.authService.signRefreshToken(signJwtTokenDto, tokenVersion);
    // send jid cookie refresh token to client (browser, insomnia etc)
    this.authService.sendRefreshToken(res, refreshToken);
    // return loginUserResponse
    return { user: user, accessToken };
  }

  @Mutation(returns => Boolean)
  async userLogout(
    @Context() { res, payload }: GqlContext,
  ): Promise<boolean> {
    // send empty refreshToken, with same name jid, etc, better than res.clearCookie
    // this will invalidate the browser cookie refreshToken, only work with browser, not with insomnia etc
    this.authService.sendRefreshToken(res, { accessToken: '' });
    return true;
  }

  // Don't expose this resolver, only used in development environments
  @Mutation(returns => Boolean)
  async revokeUserRefreshTokens(
    @Args('username') username: string,
  ): Promise<boolean> {
    // invalidate user tokens increasing tokenVersion, this way last tokenVersion of refreshToken will be invalidate
    // when user tries to use it in /refresh-token and current version is greater than refreshToken.tokenVersion
    this.userService.usersStore.incrementTokenVersion(username);
    return true;
  }

  @Roles(UserRoles.ROLE_USER)
  @UseGuards(GqlRolesGuard)
  @Subscription(returns => String)
  userLogged(
    @CurrentUser() user: CurrentUserPayload,
  ) {
    return pubSub.asyncIterator(SubscriptionEvent.userLogged);
  }
}
