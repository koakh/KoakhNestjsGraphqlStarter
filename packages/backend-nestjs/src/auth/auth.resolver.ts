import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { SubscriptionEvent } from '../common/enums';
import { User } from '../user/object-types';
import { constants as uc } from '../user/user.constants';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { CurrentUser, Roles } from './decorators';
import { UserRoles } from './enums';
import { GqlAuthGuard, GqlLocalAuthGuard, GqlRolesGuard } from './guards';
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
    const user: User = await this.userService.findOneByField('username', loginUserData.username, uc.adminCurrentUser);
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

  @Roles(UserRoles.ROLE_USER)
  @UseGuards(GqlRolesGuard)
  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Boolean)
  async userLogout(
    @CurrentUser() currentUser: CurrentUserPayload,
    @Context() { res, payload }: GqlContext,
  ): Promise<boolean> {
    // always incrementVersion this way user can't use refreshToken anymore
    this.userService.usersStore.incrementTokenVersion(currentUser.username);
    // send empty refreshToken, with same name jid, etc, better than res.clearCookie
    // this will invalidate the browser cookie refreshToken, only work with browser, not with insomnia etc
    this.authService.sendRefreshToken(res, { accessToken: '' });
    return true;
  }

  // Don't expose this resolver, only used in development environments
  @Roles(UserRoles.ROLE_ADMIN)
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
    @CurrentUser() currentUser: CurrentUserPayload,
  ) {
    return pubSub.asyncIterator(SubscriptionEvent.userLogged);
  }
}
