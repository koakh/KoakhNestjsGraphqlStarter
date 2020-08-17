import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Query, Resolver,  } from '@nestjs/graphql';
import { UsersService } from './user.service';
import { User } from './models';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { PaginationArgs } from '../common/dto';

@Resolver()
@UseGuards(GqlAuthGuard)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
  ) { }
  @Query(returns => [User])
  async users(
    @Args() paginationArgs: PaginationArgs,
  ): Promise<User[]> {
    return await this.usersService.findAll(paginationArgs);
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
}
