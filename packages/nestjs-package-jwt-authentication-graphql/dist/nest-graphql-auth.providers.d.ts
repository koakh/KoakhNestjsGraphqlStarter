import { NestGraphqlAuthOptions } from './interfaces';
export declare function createNestGraphqlAuthProviders(options: NestGraphqlAuthOptions): {
    provide: symbol;
    useValue: NestGraphqlAuthOptions;
}[];
export declare const createNestGraphqlAuthModuleProviders: ({
    provide: symbol;
    useFactory: (authModuleOptions: NestGraphqlAuthOptions) => Promise<NestGraphqlAuthOptions>;
    inject: symbol[];
} | {
    provide: symbol;
    useFactory: (authModuleOptions: NestGraphqlAuthOptions) => Promise<import("./abstracts").UserServiceAbstract>;
    inject: symbol[];
})[];
