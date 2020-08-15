import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UsersStore } from './users.store';
import { appConstants as c } from '../constants';
import { User } from './models';
import { UserData } from './types';
import { userDate } from './constants';


@Injectable()
export class UsersService {
  // init usersStore
  usersStore: UsersStore = new UsersStore();

  constructor() { }
  async findOneByUsername(username: string): Promise<User | undefined> {
    try {
      return userDate.find((e:UserData) => e.username === username);
    } catch (error) {
      Logger.error(JSON.stringify(error));
      const errorMessage: string = (error.responses[0]) ? error.responses[0].error.message : c.API_RESPONSE_INTERNAL_SERVER_ERROR;
      // throw new HttpException({ status: HttpStatus.CONFLICT, error: errorMessage }, HttpStatus.NOT_FOUND);
      // don't show original error message, override it with a forbidden message equal to the one when fails password, more secure, this way we hide if username exists or not form hacking
      throw new HttpException({ status: HttpStatus.FORBIDDEN, error: 'Forbidden', message: `Forbidden resource` }, HttpStatus.FORBIDDEN);
    }
  }
}
