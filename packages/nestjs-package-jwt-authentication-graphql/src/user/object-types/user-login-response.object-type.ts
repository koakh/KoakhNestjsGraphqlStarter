import { ObjectType, Field } from '@nestjs/graphql';
import { IsDefined } from 'class-validator';
import { User } from './user.model';

@ObjectType()
export class UserLoginResponse {
  @Field(type => User)
  @IsDefined()
  user: User;

  @Field()
  accessToken: string;
}
