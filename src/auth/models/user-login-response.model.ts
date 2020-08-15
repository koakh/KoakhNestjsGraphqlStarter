import { Field, ObjectType } from 'type-graphql';
import { IsDefined } from 'class-validator';
import { User } from '../../users/models';

@ObjectType()
export class UserLoginResponse {
  @Field(type => User)
  @IsDefined()
  user: User;

  @Field()
  accessToken: string;
}
