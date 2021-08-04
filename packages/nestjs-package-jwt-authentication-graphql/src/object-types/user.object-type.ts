import { IsDefined, IsOptional, Validate } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import * as yup from 'yup';
import { UserRoles } from '../enums';
//
@ObjectType()
export class User {
  @Field(type => ID)
  @IsDefined()
  id: string;

  @Field()
  @IsDefined()
  username: string;

  // not exposed
  password?: string;

  @Field()
  @IsDefined()
  firstName?: string;

  @Field()
  @IsDefined()
  lastName?: string;

  @Field()
  email?: string;

  @Field(type => [String], { defaultValue: [UserRoles.ROLE_USER] })
  roles: string[];

  @Field()
  @IsOptional()
  @Validate(yup.number)
  createdDate?: number;
  
  @Field()
  @IsOptional()
  createdBy?: string;

  @Field(type => GraphQLJSONObject, { nullable: true })
  @IsOptional()
  metaData?: any;
}
