import { IsDefined, IsOptional, IsUUID } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Field, InputType } from '@nestjs/graphql';
import { UserRoles } from '../types';

@InputType()
export class NewUserInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  id: string;

  @Field()
  @IsDefined()
  username: string;

  @Field()
  @IsDefined()
  password: string;

  @Field()
  @IsDefined()
  firstName: string;

  @Field()
  @IsDefined()
  lastName: string;

  @Field({ nullable: true })
  email: string;

  // proptect register from use roles, else we can't have a security problem here, uncoment to enable
  // @Field(type => [String], { defaultValue: [UserRoles.User] })
  // roles: string[];

  @Field(type => GraphQLJSONObject, { nullable: true })
  @IsOptional()
  metaData: any;
}
