import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { UserRoles } from '../auth/enums';
import { CurrentUserPayload } from '../auth/interfaces';
import { PaginationArgs } from '../common/input-types';
import { newUuid } from '../common/utils/main.util';
import { NewUserInput, UpdateUserInput, UpdateUserPasswordInput, UpdateUserProfileInput } from './input-type';
import { UserData } from './interfaces';
import { User } from './object-types';
import { UserInMemory } from './user.data';
import { UserStore } from './user.store';
import { hashPassword } from './utils';
// import { UserInMemory } from './user.data';

@Injectable()
export class UserService {
  // init usersStore inMemory refreshToken versions
  usersStore: UserStore = new UserStore();
  // init usersStore
  usersData: UserInMemory = new UserInMemory();

  validateFreeUserEmail = (email: string, username: string) => {
    const findUser = this.usersData.data.find((e: UserData) => e.username === username || e.email === email);
    if (findUser) {
      throw new HttpException({ status: HttpStatus.CONFLICT, error: 'user with that username and/or email already exists!' }, HttpStatus.CONFLICT);
    }
  }

  validateEmail = (userId: string, email: string) => {
    // currentUser: CurrentUserPayload    
    const findUser = this.usersData.data.find((e: UserData) => e.email === email);
    if (findUser && findUser.id != userId) {
      throw new HttpException({ status: HttpStatus.CONFLICT, error: 'user with that email already exists!' }, HttpStatus.CONFLICT);
    }
  }

  async create(data: NewUserInput, currentUser?: CurrentUserPayload): Promise<User> {
    this.validateFreeUserEmail(data.username, data.email);
    const password = hashPassword(data.password);
    const user = {
      ...data,
      id: data.id || newUuid(),
      password,
      roles: [UserRoles.ROLE_USER],
      // add date in epoch unix time
      createdDate: new Date().getTime(),
    };
    this.usersData.data.push(user);
    return user;
  }

  async findAll(paginationArgs: PaginationArgs, currentUser?: CurrentUserPayload): Promise<User | User[]> {
    // clone array before slice it
    const data = this.usersData.data.slice();
    return (paginationArgs)
      ? data.splice(paginationArgs.skip, paginationArgs.take)
      : data;
  }

  async findOneByField(key: string, value: string, currentUser?: CurrentUserPayload): Promise<User> {
    const findUser = this.usersData.data.find((e: UserData) => e[key] === value);
    if (!findUser) {
      // throw new HttpException({ status: HttpStatus.NO_CONTENT, error: 'no content' }, HttpStatus.NO_CONTENT);
      throw new NotFoundException();
    }
    return findUser;
  }

  async update(data: UpdateUserInput, currentUser?: CurrentUserPayload): Promise<User> {
    this.validateEmail(currentUser.userId, data.email);
    // double check if user Exists, or fail
    let userToUpdate = await this.findOneByField('id', data.id, currentUser);
    this.usersData.update(data.id, data as User);
    // return mutated data
    return this.usersData.data.find((e: UserData) => e.id === data.id);
  }

  async updatePassword(data: UpdateUserPasswordInput, user: CurrentUserPayload): Promise<User> {
    let userToUpdate = await this.findOneByField('id', data.id, user);
    userToUpdate.password = hashPassword(data.password);
    return userToUpdate;
  }

  async updateProfile(data: UpdateUserProfileInput, currentUser: CurrentUserPayload): Promise<User> {
    this.validateEmail(currentUser.userId, data.email);
    // double check if user Exists, or fail
    let userToUpdate = await this.findOneByField('id', currentUser.userId);
    this.usersData.update(currentUser.userId, data as User);
    // return mutated data
    return this.usersData.data.find((e: UserData) => e.id === currentUser.userId);
  }
}
