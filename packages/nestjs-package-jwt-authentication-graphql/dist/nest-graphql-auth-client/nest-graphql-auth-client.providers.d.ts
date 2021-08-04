import { NestGraphqlAuthOptions } from './interfaces';
export declare function createNestGraphqlAuthProviders(options: NestGraphqlAuthOptions): {
    provide: any;
    useValue: any;
}[];
export declare const createNestGraphqlAuthModuleProviders: {
    provide: any;
    useFactory: (authModuleOptions: any) => Promise<any>;
    inject: any[];
}[];
