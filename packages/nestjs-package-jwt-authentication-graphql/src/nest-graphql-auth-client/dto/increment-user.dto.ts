import { Length } from 'class-validator';

export class IncrementUserDto {
  @Length(5, 20)
  username: string;
}
