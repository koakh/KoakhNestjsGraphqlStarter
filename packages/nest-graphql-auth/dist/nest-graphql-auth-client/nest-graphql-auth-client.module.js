"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestGraphqlAuthClientModule = void 0;
/**
 *  NestGraphqlAuthClientModule is a testing module that verifies that
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
const nest_graphql_auth_module_1 = require("../nest-graphql-auth.module");
const constants_1 = require("./constants");
const nest_graphql_auth_client_controller_1 = require("./nest-graphql-auth-client.controller");
const nest_graphql_auth_user_service_1 = require("./nest-graphql-auth-user.service");
let NestGraphqlAuthClientModule = class NestGraphqlAuthClientModule {
};
NestGraphqlAuthClientModule = __decorate([
    common_1.Module({
        controllers: [nest_graphql_auth_client_controller_1.NestGraphqlAuthClientController],
        imports: [
            nest_graphql_auth_module_1.NestGraphqlAuthModule.registerAsync({
                useFactory: () => {
                    return {
                        // TODO use configService here
                        secret: '90dcfcd8-d3bd-4af0-a8a3-f3e03181a828',
                        expiresIn: '120s',
                        adminUserPayload: constants_1.constants.adminCurrentUser,
                        userService: new nest_graphql_auth_user_service_1.UserService(),
                    };
                },
            }),
        ],
    })
], NestGraphqlAuthClientModule);
exports.NestGraphqlAuthClientModule = NestGraphqlAuthClientModule;
