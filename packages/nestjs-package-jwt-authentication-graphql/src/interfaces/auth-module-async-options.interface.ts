/* Dependencies */
import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { AuthOptions } from './auth-options.interface';
import { AuthOptionsFactory } from './auth-options-factory.interface';

export interface AuthAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useExisting?: Type<AuthOptionsFactory>;
  useClass?: Type<AuthOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<AuthOptions> | AuthOptions;
}