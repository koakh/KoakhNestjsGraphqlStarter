import { IsDefined, IsOptional, IsUUID } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Field, InputType } from 'type-graphql';
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

  @Field(type => [String], { defaultValue: UserRoles.User })
  roles: string[];

  @Field({ nullable: true })
  email: string;

  @Field(type => GraphQLJSONObject, { nullable: true })
  @IsOptional()
  metaData: any;
}
