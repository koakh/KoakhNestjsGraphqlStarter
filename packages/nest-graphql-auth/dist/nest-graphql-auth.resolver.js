"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const constants_1 = require("./constants");
const nest_graphql_auth_service_1 = require("./nest-graphql-auth.service");
// import { AccessToken, User, UserLoginResponse } from './object-types';
const pubSub = new graphql_subscriptions_1.PubSub();
let AuthResolver = class AuthResolver {
    constructor(
    // AuthModule providers
    authService, 
    // Consumer app providers
    authModuleOptions) {
        this.authService = authService;
        this.authModuleOptions = authModuleOptions;
        this.userService = authModuleOptions.userService;
    }
};
AuthResolver = __decorate([
    graphql_1.Resolver(),
    __param(1, common_1.Inject(constants_1.NEST_GRAPHQL_AUTH_OPTIONS)),
    __metadata("design:paramtypes", [nest_graphql_auth_service_1.NestGraphqlAuthService, Object])
], AuthResolver);
exports.AuthResolver = AuthResolver;
