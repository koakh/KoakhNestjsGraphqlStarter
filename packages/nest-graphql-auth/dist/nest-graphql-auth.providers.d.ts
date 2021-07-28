import { NestGraphqlAuthOptions } from './interfaces';
export declare function createNestGraphqlAuthProviders(options: NestGraphqlAuthOptions): {
    provide: string;
    useValue: NestGraphqlAuthOptions;
}[];
