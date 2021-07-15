import { IsDefined } from 'class-validator';
import { GraphQLJSONObject } from 'graphql-type-json';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class GetByComplexQueryInput {

  @Field(type => GraphQLJSONObject)
  @IsDefined()
  public filter: any;

  // used to try prevent problems with sort
  @Field(type => [String], { nullable: true })
  public fields?: string[];

  @Field(type => [GraphQLJSONObject], { nullable: true })
  public sort?: any;
}
