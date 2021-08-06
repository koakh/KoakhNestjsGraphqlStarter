import { DynamicModule, MiddlewareConsumer } from '@nestjs/common';
import { AuthAsyncOptions, AuthOptions } from './interfaces';
export declare class AuthModule {
    configure(consumer: MiddlewareConsumer): void;
    /**
     * Registers a configured NestGraphqlAuth Module for import into the current module
     */
    static register(options: AuthOptions): DynamicModule;
    /**
     * Registers a configured NestGraphqlAuth Module for import into the current module
     * using dynamic options (factory, etc)
     */
    static registerAsync(options: AuthAsyncOptions): DynamicModule;
    private static createProviders;
    private static createOptionsProvider;
}
