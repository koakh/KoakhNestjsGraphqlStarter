import { NestGraphqlAuthService } from '../nest-graphql-auth.service';
export declare class NestGraphqlAuthClientController {
    private readonly nestGraphqlAuthService;
    constructor(nestGraphqlAuthService: NestGraphqlAuthService);
    index(): Promise<any>;
}
