import { IsOptional, IsUUID } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';
import { UserRoles } from '../../auth/enums';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field()
  @IsUUID()
  id: string;

  @Field(type => [String], { defaultValue: UserRoles.ROLE_USER })
  roles: string[];

  @Field(type => GraphQLJSONObject, { nullable: true })
  @IsOptional()
  metaDataInternal: any;
}
