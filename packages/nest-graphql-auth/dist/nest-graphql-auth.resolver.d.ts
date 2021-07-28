import { NestGraphqlAuthService } from './nest-graphql-auth.service';
import { NestGraphqlAuthOptions } from './interfaces';
export declare class AuthResolver {
    private readonly authService;
    private readonly authModuleOptions;
    private userService;
    constructor(authService: NestGraphqlAuthService, authModuleOptions: NestGraphqlAuthOptions);
}
