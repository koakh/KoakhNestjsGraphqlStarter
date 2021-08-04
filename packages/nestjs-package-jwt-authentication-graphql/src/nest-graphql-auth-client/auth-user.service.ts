import { Injectable } from '@nestjs/common';
import { UserServiceAbstract } from '../abstracts';
import { CurrentUserPayload } from '../interfaces';
import { AuthUser } from '../types';

export const adminCurrentUser = {
  userId: 'efeed3eb-c0a2-4b3e-816f-2a42ca8451b3',
  password: '$2b$10$U9AVUdkRnFsrMjPg/XyTeOWmF.gu73gd1hJGR1s1OnKTshjJYdGpW',
  username: 'admin',
  roles: ['ROLE_USER', 'ROLE_ADMIN'],
};

@Injectable()
export class UserService implements UserServiceAbstract {
  async findOneByField(field: string, value: string, currentUser?: CurrentUserPayload): Promise<AuthUser> {
    return {
      id: adminCurrentUser.userId,
      username: adminCurrentUser.username,
      password: adminCurrentUser.password,
      roles: adminCurrentUser.roles,
    };
  }
}