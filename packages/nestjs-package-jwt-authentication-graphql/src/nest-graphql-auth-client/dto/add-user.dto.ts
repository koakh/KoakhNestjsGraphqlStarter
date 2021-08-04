import { Length } from 'class-validator';

export class AddUserDto {
  @Length(5, 20)
  username: string;
}
