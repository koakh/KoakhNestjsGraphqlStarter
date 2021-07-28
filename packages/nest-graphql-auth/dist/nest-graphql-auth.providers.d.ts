import { NestGraphqlAuthOptions } from './interfaces';
export declare function createNestGraphqlAuthProviders(options: NestGraphqlAuthOptions): {
    provide: string;
    useValue: NestGraphqlAuthOptions;
}[];
export declare const createNestGraphqlAuthModuleProviders: ({
    provide: string;
    useFactory: (authModuleOptions: NestGraphqlAuthOptions) => Promise<NestGraphqlAuthOptions>;
    inject: string[];
} | {
    provide: string;
    useFactory: (authModuleOptions: NestGraphqlAuthOptions) => Promise<import("./abstracts").UserServiceAbstract>;
    inject: string[];
})[];
