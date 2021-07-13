import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Query, Resolver,  } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './models';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { PaginationArgs } from '../common/dto';

@Resolver(of => User)
@UseGuards(GqlAuthGuard)
export class UsersResolver {
  constructor(
    private readonly userService: UserService,
  ) { }
  @Query(returns => [User])
  async users(
    @Args() paginationArgs: PaginationArgs,
  ): Promise<User[]> {
    return await this.userService.findAll(paginationArgs);
  }

  @Query(returns => User)
  async userById(
    @Args('id') id: string,
  ): Promise<User> {
    const user = await this.userService.findOneByField('id', id);
    if (!user) {
      throw new NotFoundException(id);
    }
    return user;
  }
}
