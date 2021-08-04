import { NestGraphqlAuthService } from '../auth.service';
import { ValidateUserDto } from './dto';
export declare class NestGraphqlAuthClientController {
    private readonly nestGraphqlAuthService;
    constructor(nestGraphqlAuthService: NestGraphqlAuthService);
    validateUser({ username, password }: ValidateUserDto): Promise<any>;
    signRefreshToken(): Promise<import("../object-types").AccessToken>;
}
