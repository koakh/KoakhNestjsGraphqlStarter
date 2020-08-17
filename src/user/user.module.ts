import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UsersResolver } from './user.resolver';

@Module({
  providers: [UsersService, UsersResolver],
  exports: [UsersService, UsersResolver],
})

export class UsersModule { }
