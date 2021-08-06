import { AuthOptions } from './interfaces';
export declare function createNestGraphqlAuthProviders(options: AuthOptions): {
    provide: symbol;
    useValue: AuthOptions;
}[];
export declare const createNestGraphqlAuthModuleProviders: ({
    provide: symbol;
    useFactory: (authModuleOptions: AuthOptions) => Promise<AuthOptions>;
    inject: symbol[];
} | {
    provide: symbol;
    useFactory: (authModuleOptions: AuthOptions) => Promise<import("./abstracts").UserServiceAbstract>;
    inject: symbol[];
})[];
