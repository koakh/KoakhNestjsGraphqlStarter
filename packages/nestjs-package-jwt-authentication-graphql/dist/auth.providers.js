"use strict";
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
exports.createNestGraphqlAuthModuleProviders = exports.createNestGraphqlAuthProviders = void 0;
const auth_constants_1 = require("./auth.constants");
function createNestGraphqlAuthProviders(options) {
    return [
        {
            provide: auth_constants_1.NEST_GRAPHQL_AUTH_OPTIONS,
            useValue: options,
        },
    ];
}
exports.createNestGraphqlAuthProviders = createNestGraphqlAuthProviders;
// TODO the trick to inject into JwtModule is using this factory
// after this we can use `inject: [NEST_GRAPHQL_AUTH_OPTIONS]`
// getted from https://dev.to/nestjs/build-a-nestjs-module-for-knex-js-or-other-resource-based-libraries-in-5-minutes-12an
exports.createNestGraphqlAuthModuleProviders = [
    {
        provide: auth_constants_1.NEST_GRAPHQL_AUTH_OPTIONS,
        useFactory: (authModuleOptions) => __awaiter(void 0, void 0, void 0, function* () {
            return authModuleOptions;
        }),
        inject: [auth_constants_1.NEST_GRAPHQL_AUTH_OPTIONS],
    },
    {
        provide: auth_constants_1.NEST_GRAPHQL_AUTH_USER_SERVICE,
        useFactory: (authModuleOptions) => __awaiter(void 0, void 0, void 0, function* () {
            return authModuleOptions.userService;
        }),
        inject: [auth_constants_1.NEST_GRAPHQL_AUTH_OPTIONS],
    }
];
//# sourceMappingURL=auth.providers.js.map