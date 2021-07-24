import { Inject, Injectable, Logger } from "@nestjs/common";
import { AuthStore } from "./auth.store";
import { AUTH_MODULE_OPTIONS } from './auth.constants';
import { AuthModuleOptions } from './auth.interfaces';
import { AppServiceAbstract } from "./auth.abstracts";


@Injectable()
export class AuthService {

  private authStore: AuthStore;

  constructor(
    @Inject(AUTH_MODULE_OPTIONS)
    private readonly authModuleOptions: AuthModuleOptions,
    @Inject('APP_SERVICE')
    private readonly appService: AppServiceAbstract,
  ) {
    this.authStore = new AuthStore();
  }

  addUser(username: string, tokenVersion: number): { username: string, tokenVersion: number } {
    this.authStore.addUser(username, tokenVersion);
    return { username, tokenVersion: this.authStore.getTokenVersion(username) };
  }

  incrementTokenVersion(username: string): { username: string, tokenVersion: number } {
    return { username, tokenVersion: this.authStore.incrementTokenVersion(username) };
  }

  getConfig(): AuthModuleOptions {
    return this.authModuleOptions;
  }

  // this is from consumer app AppModule/AppService
  getHelloAppModule(): { message: string } {
    return { message: this.appService.getHello() };
  }
}
