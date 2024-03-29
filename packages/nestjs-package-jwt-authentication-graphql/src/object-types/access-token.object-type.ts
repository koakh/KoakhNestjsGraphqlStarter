import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class AccessToken {
  @Field(type => String)
  accessToken: string;
}
