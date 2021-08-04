import { Length } from 'class-validator';

export class ValidateUserDto {
  @Length(5, 20)
  username: string;
  @Length(8, 20)
  password: string;
}
