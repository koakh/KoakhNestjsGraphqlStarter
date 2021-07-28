import { UserServiceAbstract } from '../abstracts';
import { CurrentUserPayload } from '../interfaces';
import { AuthUser } from '../types';

export const adminCurrentUser = {
  userId: 'efeed3eb-c0a2-4b3e-816f-2a42ca8451b3',
  username: 'admin',
  roles: ['ROLE_USER', 'ROLE_ADMIN'],
};

export class UserService implements UserServiceAbstract {
  async findOneByField(field: string, value: string, currentUser?: CurrentUserPayload): Promise<AuthUser> {
    return {
      id: adminCurrentUser.userId,
      username: adminCurrentUser.username,
      roles: adminCurrentUser.roles,
    };
  }
}