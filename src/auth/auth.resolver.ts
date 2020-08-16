import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Query, Mutation, Resolver, Subscription, Context } from '@nestjs/graphql';
// DEPRECATED docs now use graphql-subscriptions 
import { PubSub } from 'apollo-server-express';
// TODO: remove after finish subscriptions
// import { PubSub } from 'graphql-subscriptions';
import { AuthService } from './auth.service';
import { AccessToken, UserLoginResponse } from './models';
import { GqlLocalAuthGuard } from './guards';
import { GqlContext } from '../types';
import { UsersService } from '../users/users.service';
import { SubscriptionEvent } from '../common/types';
import { LoginUserInput } from '../users/dto';
import { User } from '../users/models';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { PaginationArgs } from '../common/dto';

const pubSub = new PubSub();

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) { }
  @UseGuards(GqlAuthGuard)
  @Query(returns => [User])
  async users(
    @Args() paginationArgs: PaginationArgs,
  ): Promise<User[]> {
    return this.usersService.findAll(paginationArgs);
  }

  @UseGuards(GqlAuthGuard)
  @Query(returns => User)
  async userById(
    @Args('id') id: string,
  ): Promise<User> {
    const user = await this.usersService.findOneByField('id', id);
    if (!user) {
      throw new NotFoundException(id);
    }
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
    const user: User = await this.usersService.findOneByUsername(loginUserData.username);
    // accessToken: add some user data to it, like id and roles
    const signJwtTokenDto = { ...loginUserData, userId: user.id, roles: user.roles };
    const { accessToken } = await this.authService.signJwtToken(signJwtTokenDto);
    // assign jwt Payload to context
    payload = this.authService.getJwtPayLoad(accessToken);
    // get incremented tokenVersion
    const tokenVersion = this.usersService.usersStore.incrementTokenVersion(loginUserData.username);
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
    this.usersService.usersStore.incrementTokenVersion(username);
    return true;
  }

  @Subscription(returns => String)
  userLogged() {
    return pubSub.asyncIterator(SubscriptionEvent.userLogged);
  }
}
