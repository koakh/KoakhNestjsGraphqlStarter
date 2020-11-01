import { ConflictException, UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { SubscriptionEvent } from '../common/types';
import SignJwtTokenPayload from '../common/types/sign-jwt-token-payload';
import { GqlContext } from '../types';
import { LoginUserInput, NewUserInput } from '../user/dto';
import { User } from '../user/models';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { GqlLocalAuthGuard } from './guards';
import { AccessToken, UserLoginResponse } from './models';

const pubSub = new PubSub();

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) { }
  // unprotected method, person register don't use createdByUserId
  @Mutation(returns => User)
  async userRegister(
    @Args('newUserData') newUserData: NewUserInput,
  ): Promise<User> {
    const checkUsername = await this.userService.findOneByField('username', newUserData.username);
    if (checkUsername) {
      throw new ConflictException(`this username is already been taken by other user, please try another`);
    }
    const checkEmail = await this.userService.findOneByField('email', newUserData.email);
    if (checkEmail) {
      throw new ConflictException(`this email is already been taken by other user, please try another`);
    }
    const user = await this.userService.create(newUserData);
    pubSub.publish(SubscriptionEvent.userAdded, { [SubscriptionEvent.userAdded]: user });
    return user;
  }

  @UseGuards(GqlLocalAuthGuard)
  @Mutation(returns => UserLoginResponse)
  async userLogin(
    @Args('loginUserData') loginUserData: LoginUserInput,
    @Context() { res, payload }: GqlContext,
  ): Promise<UserLoginResponse> {
    // publish userLogged subscription
    pubSub.publish(SubscriptionEvent.userLogged, { [SubscriptionEvent.userLogged]: loginUserData.username });
    // get user
    const user: User = await this.userService.findOneByUsername(loginUserData.username);
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
    return { user, accessToken };
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

  @Subscription(returns => String)
  userLogged() {
    return pubSub.asyncIterator(SubscriptionEvent.userLogged);
  }
}
