import { AuthService } from '../auth.service';
import { ValidateUserDto } from './dto';
export declare class AuthClientController {
    private readonly nestGraphqlAuthService;
    constructor(nestGraphqlAuthService: AuthService);
    validateUser({ username, password }: ValidateUserDto): Promise<any>;
    signRefreshToken(): Promise<import("..").AccessToken>;
}
