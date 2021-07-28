import { NestGraphqlAuthService } from '../nest-graphql-auth.service';
import { ValidateUserDto } from './dto';
export declare class NestGraphqlAuthClientController {
    private readonly nestGraphqlAuthService;
    constructor(nestGraphqlAuthService: NestGraphqlAuthService);
    index(): Promise<any>;
    validateUser({ username, password }: ValidateUserDto): Promise<any>;
}
