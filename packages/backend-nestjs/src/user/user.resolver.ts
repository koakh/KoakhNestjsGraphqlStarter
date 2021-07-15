import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { CurrentUserPayload } from '../auth/interfaces/current-user-payload.interface';
import { CurrentUser, Roles } from '../auth/decorators';
import { UserRoles } from '../auth/enums';
import { GqlRolesGuard } from '../auth/guards';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { appConstants as c } from '../common/app/constants';
import { SubscriptionEvent } from '../common/enums';
import { PaginationArgs } from '../common/input-types';
import { NewUserInput } from './input-type';
import { User } from './object-types';
import { UserService } from './user.service';

const pubSub = new PubSub();

// don't use it globally, here we have some unguarded endpoints
// @UseGuards(GqlAuthGuard)
@Resolver(of => User)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Roles(UserRoles.ROLE_USER)
  @UseGuards(GqlRolesGuard)
  @UseGuards(GqlAuthGuard)
  @Query(returns => [User])
  async users(
    @Args() paginationArgs: PaginationArgs,
    @CurrentUser() currentUser: CurrentUserPayload,
  ): Promise<User | User[]> {
    return this.userService.findAll(paginationArgs, currentUser);
  }

  @Roles(UserRoles.ROLE_USER)
  @UseGuards(GqlRolesGuard)
  @UseGuards(GqlAuthGuard)
  @Query(returns => User)
  async userById(
    @Args('id') id: string,
    @CurrentUser() currentUser: CurrentUserPayload,
  ): Promise<User> {
    const user = await this.userService.findOneByField('id', id, currentUser);
    if (!user.id) {
      throw new NotFoundException(id);
    }
    return user;
  }

  @Roles(UserRoles.ROLE_USER)
  @UseGuards(GqlRolesGuard)
  @UseGuards(GqlAuthGuard)
  @Query(returns => User)
  async userByUsername(
    @Args('username') username: string,
    @CurrentUser() currentUser: CurrentUserPayload,
  ): Promise<User> {
    const user = await this.userService.findOneByField('username', username, currentUser);
    if (!user.id) {
      throw new NotFoundException(username);
    }
    return user;
  }

  @Roles(UserRoles.ROLE_USER)
  @UseGuards(GqlRolesGuard)
  @UseGuards(GqlAuthGuard)
  @Query(returns => User)
  async userProfile(
    @CurrentUser() currentUser: CurrentUserPayload,
  ): Promise<User> {
    const user = await this.userService.findOneByField('username', currentUser.username, currentUser);
    if (!user.id) {
      throw new NotFoundException(currentUser.username);
    }
    return user;
  }

  // unprotected method, user register don't use createdByUserId, we must pass ADMIN_ROLE
  @Mutation(returns => User)
  async userRegister(
    @Args('newUserData') newUserData: NewUserInput,
  ): Promise<User> {
    const user = await this.userService.create(newUserData, c.CURRENT_USER_ADMIN_ROLE);
    pubSub.publish(SubscriptionEvent.userAdded, { [SubscriptionEvent.userAdded]: user });
    return user;
  }

  // @Roles(UserRoles.ROLE_ADMIN)
  // @UseGuards(GqlRolesGuard)
  // @UseGuards(GqlAuthGuard)
  // @Mutation(returns => User)
  // async userUpdate(
  //   @Args('updateUserData') updateUserData: UpdateUserInput,
  //   @CurrentUser() currentUser: CurrentUserPayload,
  // ): Promise<User> {
  //   const user = await this.userService.update(updateUserData, currentUser);
  //   pubSub.publish(SubscriptionEvent.userUpdated, { [SubscriptionEvent.userUpdated]: user });
  //   return user;
  // }

  // @Roles(UserRoles.ROLE_USER)
  // @UseGuards(GqlRolesGuard)
  // @UseGuards(GqlAuthGuard)
  // @Mutation(returns => User)
  // async userUpdatePassword(
  //   @Args('updateUserPasswordData') updateUserPasswordData: UpdateUserPasswordInput,
  //   @CurrentUser() currentUser: CurrentUserPayload,
  // ): Promise<User> {
  //   const user = await this.userService.updatePassword(updateUserPasswordData, currentUser);
  //   pubSub.publish(SubscriptionEvent.userPasswordUpdated, { [SubscriptionEvent.userPasswordUpdated]: user });
  //   return user;
  // }

  // @Roles(UserRoles.ROLE_USER)
  // @UseGuards(GqlRolesGuard)
  // @UseGuards(GqlAuthGuard)
  // @Mutation(returns => User)
  // async userUpdateProfile(
  //   @Args('updateUserProfileData') updateUserProfileData: UpdateUserProfileInput,
  //   @CurrentUser() currentUser: CurrentUserPayload,
  // ): Promise<User> {
  //   const user = await this.userService.updateProfile(updateUserProfileData, currentUser);
  //   pubSub.publish(SubscriptionEvent.userProfileUpdated, { [SubscriptionEvent.userProfileUpdated]: user });
  //   return user;
  // }

  @Roles(UserRoles.ROLE_USER)
  @UseGuards(GqlRolesGuard)
  @UseGuards(GqlAuthGuard)
  @Subscription(returns => User)
  userAdded(
    @CurrentUser() currentUser: CurrentUserPayload,
  ) {
    return pubSub.asyncIterator(SubscriptionEvent.userAdded);
  }

  @Roles(UserRoles.ROLE_USER)
  @UseGuards(GqlRolesGuard)
  @UseGuards(GqlAuthGuard)
  @Subscription(returns => User)
  userUpdated(
    @CurrentUser() currentUser: CurrentUserPayload,
  ) {
    return pubSub.asyncIterator(SubscriptionEvent.userUpdated);
  }

  @Roles(UserRoles.ROLE_USER)
  @UseGuards(GqlRolesGuard)
  @UseGuards(GqlAuthGuard)
  @Subscription(returns => User)
  userPasswordUpdated(
    @CurrentUser() currentUser: CurrentUserPayload,
  ) {
    return pubSub.asyncIterator(SubscriptionEvent.userPasswordUpdated);
  }

  @Roles(UserRoles.ROLE_USER)
  @UseGuards(GqlRolesGuard)
  @UseGuards(GqlAuthGuard)
  @Subscription(returns => User)
  userProfileUpdated(
    @CurrentUser() currentUser: CurrentUserPayload,
  ) {
    return pubSub.asyncIterator(SubscriptionEvent.userProfileUpdated);
  }

  @Roles(UserRoles.ROLE_USER)
  @UseGuards(GqlRolesGuard)
  @UseGuards(GqlAuthGuard)
  @Subscription(returns => User)
  userCitizenCardUpserted(
    @CurrentUser() currentUser: CurrentUserPayload,
  ) {
    return pubSub.asyncIterator(SubscriptionEvent.userCitizenCardUpserted);
  }
}
