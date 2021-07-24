import { createConfigurableDynamicRootModule } from '@golevelup/nestjs-modules';
import { Module } from '@nestjs/common';
import { AUTH_MODULE_OPTIONS } from './auth.constants';
import { AuthModuleOptions } from './auth.interfaces';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule extends createConfigurableDynamicRootModule<
  AuthModule,
  AuthModuleOptions
>(AUTH_MODULE_OPTIONS) { }