"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthClientModule = void 0;
/**
 *  AuthClientModule is a testing module that verifies that
 *  NestGraphqlAuthModule was generated properly.
 *
 *  You can quickly verify this by running `npm run start:dev`, and then
 *  connecting to `http://localhost:3000` with your browser.  It should return
 *  a custom message like `Hello from NestGraphqlAuthModule`.
 *
 *  Once you begin customizing NestGraphqlAuthModule, you'll probably want
 *  to delete this module.
 */
const common_1 = require("@nestjs/common");
const auth_module_1 = require("../auth.module");
const constants_1 = require("./constants");
const auth_client_controller_1 = require("./auth-client.controller");
const auth_user_service_1 = require("./auth-user.service");
// REQUIRED global else gives bellow error
// Nest can't resolve dependencies of the Symbol(NEST_GRAPHQL_AUTH_OPTIONS) (?). Please make sure that the argument UserService at index [0] is available in the AuthModule context.
let AuthClientModule = class AuthClientModule {
};
AuthClientModule = __decorate([
    common_1.Global(),
    common_1.Module({
        providers: [
            // the trick to inject usersService into NestGraphqlAuthModule is add UserService to providers and exports
            auth_user_service_1.UserService,
        ],
        exports: [
            // the trick to inject usersService into NestGraphqlAuthModule is add UserService to providers and exports
            auth_user_service_1.UserService,
        ],
        imports: [
            auth_module_1.AuthModule.registerAsync({
                useFactory: (userService) => __awaiter(void 0, void 0, void 0, function* () {
                    return ({
                        // use configService here, or leave it static, better is keep this poc simple as can be
                        secret: '90dcfcd8-d3bd-4af0-a8a3-f3e03181a828',
                        expiresIn: '15m',
                        refreshTokenJwtSecret: '11749141-ca9c-4107-97f4-c312cb11b012',
                        refreshTokenExpiresIn: '7d',
                        adminUserPayload: constants_1.constants.adminCurrentUser,
                        userService,
                    });
                }),
                inject: [auth_user_service_1.UserService],
            }),
        ],
        controllers: [auth_client_controller_1.AuthClientController],
    })
], AuthClientModule);
exports.AuthClientModule = AuthClientModule;
//# sourceMappingURL=auth-client.module.js.map