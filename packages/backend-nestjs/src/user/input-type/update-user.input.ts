import { IsDefined, IsEmail, IsOptional, IsUUID } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';
import { UserRoles } from '../../auth/enums';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field()
  @IsUUID()
  id: string;

  @Field({ nullable: true })
  @IsOptional()
  firstName: string;

  @Field({ nullable: true })
  @IsOptional()
  lastName: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  email: string;

  @Field(type => GraphQLJSONObject, { nullable: true })
  @IsOptional()
  metaData: any;

  @Field(type => [String], { defaultValue: UserRoles.ROLE_USER })
  @IsOptional()
  roles: string[];
}
