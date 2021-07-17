import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CurrentUserPayload } from '../auth/interfaces';
import { UserRoles } from '../auth/enums';
import { PaginationArgs } from '../common/input-types';
import { newUuid } from '../common/utils/main.util';
import { NewUserInput, UpdateUserInput } from './input-type';
import { UserData } from './interfaces';
import { User } from './object-types';
import { userData } from './user.data';
import { UserStore } from './user.store';
import { hashPassword } from './utils';
import { UnauthorizedException } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UserService {
  // init usersStore
  usersStore: UserStore = new UserStore();

  async create(data: NewUserInput, user: CurrentUserPayload | null): Promise<User> {
    try {
      const password = hashPassword(data.password);
      const user = {
        ...data,
        id: data.id || newUuid(),
        password,
        roles: [UserRoles.ROLE_USER],
        // add date in epoch unix time
        createdDate: new Date().getTime(),
      };
      userData.push(user);
      return user;
    } catch (error) {
      // extract error message
      const errorMessage: string = (error.responses && error.responses[0].error.message) ? error.responses[0].error.message : error;
      // override default 'throw errorMessage;' with a customized version
      throw new HttpException({ status: HttpStatus.CONFLICT, error: errorMessage }, HttpStatus.CONFLICT);
    }
  }

  async findAll(paginationArgs: PaginationArgs, user: CurrentUserPayload): Promise<User | User[]> {
    // clone array before slice it
    const data = userData.slice();
    return (paginationArgs)
      ? data.splice(paginationArgs.skip, paginationArgs.take)
      : data;
  }

  async findOneByField(key: string, value: string, user: CurrentUserPayload): Promise<User> {
    const findUser = userData.find((e: UserData) => e[key] === value);
    if (!findUser) {
      // throw new HttpException({ status: HttpStatus.NO_CONTENT, error: 'no content' }, HttpStatus.NO_CONTENT);
      throw new NotFoundException();
    }
    return findUser;
  }

  // TODO
  async update(data: UpdateUserInput, user: CurrentUserPayload): Promise<User> {
    try {
      let userToUpdate = await this.findOneByField('id', data.id, user);
      userToUpdate = { ...userToUpdate, ...data };
      return userToUpdate;
    } catch (error) {
      throw error;
    }
  }

  // async updatePassword(data: UpdateUserPasswordInput, user: CurrentUserPayload): Promise<User> {
  //   try {
  //     // compose ConvectorModel from Input
  //     const personToUpdate: UserConvectorModel = new UserConvectorModel({
  //       ...data
  //     });
  //     await UserControllerBackEnd.updatePassword(personToUpdate, user);
  //     return this.findOneById(data.id, user);
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // async updateProfile(data: UpdateUserProfileInput, user: CurrentUserPayload): Promise<User> {
  //   try {
  //     // compose ConvectorModel from Input
  //     const personToUpdate: UserConvectorModel = new UserConvectorModel({
  //       ...data
  //     });
  //     await UserControllerBackEnd.updateProfile(personToUpdate, user);
  //     return this.findOneById(data.id, user);
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}
