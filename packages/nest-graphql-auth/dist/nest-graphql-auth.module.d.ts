import { DynamicModule } from '@nestjs/common';
import { NestGraphqlAuthAsyncOptions, NestGraphqlAuthOptions } from './interfaces';
export declare class NestGraphqlAuthModule {
    /**
     * Registers a configured NestGraphqlAuth Module for import into the current module
     */
    static register(options: NestGraphqlAuthOptions): DynamicModule;
    /**
     * Registers a configured NestGraphqlAuth Module for import into the current module
     * using dynamic options (factory, etc)
     */
    static registerAsync(options: NestGraphqlAuthAsyncOptions): DynamicModule;
    private static createProviders;
    private static createOptionsProvider;
}
