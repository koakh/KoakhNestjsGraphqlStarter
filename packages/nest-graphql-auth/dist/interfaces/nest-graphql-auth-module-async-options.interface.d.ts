import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { NestGraphqlAuthOptions } from './nest-graphql-auth-options.interface';
import { NestGraphqlAuthOptionsFactory } from './nest-graphql-auth-options-factory.interface';
export interface NestGraphqlAuthAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    inject?: any[];
    useExisting?: Type<NestGraphqlAuthOptionsFactory>;
    useClass?: Type<NestGraphqlAuthOptionsFactory>;
    useFactory?: (...args: any[]) => Promise<NestGraphqlAuthOptions> | NestGraphqlAuthOptions;
}
