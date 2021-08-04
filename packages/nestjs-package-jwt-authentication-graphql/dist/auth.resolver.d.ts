import { UserServiceAbstract } from './abstracts';
import { AuthService } from './auth.service';
import { LoginUserInput } from './input-types';
import { CurrentUserPayload, GqlContext } from './interfaces';
import { UserLoginResponse } from './object-types';
export declare class AuthResolver {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UserServiceAbstract);
    userLogin(loginUserData: LoginUserInput, { res, payload }: GqlContext): Promise<UserLoginResponse>;
    userLogout(currentUser: CurrentUserPayload, { res, payload }: GqlContext): Promise<boolean>;
    revokeUserRefreshTokens(username: string): Promise<boolean>;
    userLogged(currentUser: CurrentUserPayload): AsyncIterator<unknown, any, undefined>;
}
