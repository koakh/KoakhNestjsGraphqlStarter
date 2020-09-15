import { IsDefined, IsUUID } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserPasswordInput {
  @Field()
  @IsUUID()
  id: string;

  @Field({ nullable: true })
  @IsDefined()
  password: string;
}
