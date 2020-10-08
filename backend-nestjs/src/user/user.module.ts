import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UsersResolver } from './user.resolver';

@Module({
  providers: [UserService, UsersResolver],
  exports: [UserService, UsersResolver],
})

export class UsersModule { }
