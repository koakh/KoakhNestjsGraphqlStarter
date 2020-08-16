import { IsOptional, IsUUID } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Field, InputType } from '@nestjs/graphql';
import { UserRoles } from '../types';

@InputType()
export class UpdateUserInput {
  @Field()
  @IsUUID()
  id: string;

  @Field(type => [String], { defaultValue: UserRoles.User })
  roles: string[];

  @Field(type => GraphQLJSONObject, { nullable: true })
  @IsOptional()
  metaDataInternal: any;
}
