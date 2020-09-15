import { Field, ObjectType } from '@nestjs/graphql';
import { IsDefined } from 'class-validator';
import { User } from '../../user/models';

@ObjectType()
export class UserLoginResponse {
  @Field(type => User)
  @IsDefined()
  user: User;

  @Field()
  accessToken: string;
}
