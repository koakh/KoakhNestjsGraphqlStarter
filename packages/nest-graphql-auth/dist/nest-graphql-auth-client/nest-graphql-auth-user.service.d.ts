import { UserServiceAbstract } from '../abstracts';
import { CurrentUserPayload } from '../interfaces';
import { AuthUser } from '../types';
export declare const adminCurrentUser: {
    userId: string;
    password: string;
    username: string;
    roles: string[];
};
export declare class UserService implements UserServiceAbstract {
    findOneByField(field: string, value: string, currentUser?: CurrentUserPayload): Promise<AuthUser>;
}
