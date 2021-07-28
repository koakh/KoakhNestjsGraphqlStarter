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
var NestGraphqlAuthModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestGraphqlAuthModule = void 0;
// import { JwtModule } from '@nestjs/jwt';
const common_1 = require("@nestjs/common");
const constants_1 = require("./constants");
const nest_graphql_auth_providers_1 = require("./nest-graphql-auth.providers");
const nest_graphql_auth_service_1 = require("./nest-graphql-auth.service");
let NestGraphqlAuthModule = NestGraphqlAuthModule_1 = class NestGraphqlAuthModule {
    /**
     * Registers a configured NestGraphqlAuth Module for import into the current module
     */
    static register(options) {
        return {
            module: NestGraphqlAuthModule_1,
            providers: nest_graphql_auth_providers_1.createNestGraphqlAuthProviders(options),
        };
    }
    /**
     * Registers a configured NestGraphqlAuth Module for import into the current module
     * using dynamic options (factory, etc)
     */
    static registerAsync(options) {
        return {
            module: NestGraphqlAuthModule_1,
            providers: [
                ...this.createProviders(options),
            ],
        };
    }
    static createProviders(options) {
        if (options.useExisting || options.useFactory) {
            return [this.createOptionsProvider(options)];
        }
        return [
            this.createOptionsProvider(options),
            {
                provide: options.useClass,
                useClass: options.useClass,
            },
        ];
    }
    static createOptionsProvider(options) {
        if (options.useFactory) {
            return {
                provide: constants_1.NEST_GRAPHQL_AUTH_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        // For useExisting...
        return {
            provide: constants_1.NEST_GRAPHQL_AUTH_OPTIONS,
            useFactory: (optionsFactory) => __awaiter(this, void 0, void 0, function* () { return yield optionsFactory.createNestGraphqlAuthOptions(); }),
            inject: [options.useExisting || options.useClass],
        };
    }
};
NestGraphqlAuthModule = NestGraphqlAuthModule_1 = __decorate([
    common_1.Global(),
    common_1.Module({
        providers: [nest_graphql_auth_service_1.NestGraphqlAuthService, /*connectionFactory*/],
        exports: [nest_graphql_auth_service_1.NestGraphqlAuthService, /*connectionFactory*/ ,],
        // imports: [
        //   // PassportModule,
        //   JwtModule.registerAsync({
        //     useFactory: async (authModuleOptions: NestGraphqlAuthOptions) => ({
        //       secret: 'authModuleOptions.secret',
        //       signOptions: {
        //         expiresIn: 'authModuleOptions.expiresIn',
        //       }
        //     }),
        //     // inject: [NEST_GRAPHQL_AUTH_OPTIONS],
        //   }),
        // ],
    })
], NestGraphqlAuthModule);
exports.NestGraphqlAuthModule = NestGraphqlAuthModule;
