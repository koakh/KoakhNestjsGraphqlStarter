import { IsDefined, MaxLength } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class LoginUserInput {
  @Field()
  @IsDefined()
  @MaxLength(15)
  username: string;

  @Field()
  @IsDefined()
  @MaxLength(15)
  password: string;
}
