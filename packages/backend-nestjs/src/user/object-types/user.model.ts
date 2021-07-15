import { IsDefined, Validate } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import * as yup from 'yup';
import { UserRoles } from '../../auth/enums';

@ObjectType()
export class User {
  @Field(type => ID)
  @IsDefined()
  id: string;

  @Field()
  @IsDefined()
  username: string;

  // not exposed
  password: string;

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
  @IsDefined()
  @Validate(yup.number)
  createdDate: number;

  @Field(type => GraphQLJSONObject, { nullable: true })
  metaData: any;
}
