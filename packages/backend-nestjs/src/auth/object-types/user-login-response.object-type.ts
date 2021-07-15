import { ObjectType, Field } from '@nestjs/graphql';
import { IsDefined } from 'class-validator';
import { User } from '../../user/object-types';

@ObjectType()
export class UserLoginResponse {
  @Field(type => User)
  @IsDefined()
  user: User;

  @Field()
  accessToken: string;
}
