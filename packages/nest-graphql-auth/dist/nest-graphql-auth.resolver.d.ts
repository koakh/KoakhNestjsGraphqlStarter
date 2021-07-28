import { UserServiceAbstract } from './abstracts';
import { NestGraphqlAuthService } from './nest-graphql-auth.service';
import { LoginUserInput } from './input-types';
import { CurrentUserPayload, GqlContext } from './interfaces';
import { UserLoginResponse } from './object-types';
export declare class NestGraphqlAuthResolver {
    private readonly authService;
    private readonly userService;
    constructor(authService: NestGraphqlAuthService, userService: UserServiceAbstract);
    userLogin(loginUserData: LoginUserInput, { res, payload }: GqlContext): Promise<UserLoginResponse>;
    userLogout(currentUser: CurrentUserPayload, { res, payload }: GqlContext): Promise<boolean>;
    revokeUserRefreshTokens(username: string): Promise<boolean>;
    userLogged(currentUser: CurrentUserPayload): AsyncIterator<unknown, any, undefined>;
}
