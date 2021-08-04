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
exports.NestGraphqlAuthClientController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../auth.service");
const dto_1 = require("./dto");
const nest_graphql_auth_user_service_1 = require("./nest-graphql-auth-user.service");
let NestGraphqlAuthClientController = class NestGraphqlAuthClientController {
    constructor(nestGraphqlAuthService) {
        this.nestGraphqlAuthService = nestGraphqlAuthService;
    }
    // curl -X POST localhost:3000/validate-user -d '{ "username" : "admin", "password": "12345678" }' -H 'Content-Type: application/json' | jq
    validateUser({ username, password }) {
        return this.nestGraphqlAuthService.validateUser(username, password);
    }
    // curl -X POST localhost:3000/sign-refresh-token -H 'Content-Type: application/json' | jq
    signRefreshToken() {
        return this.nestGraphqlAuthService.signRefreshToken(nest_graphql_auth_user_service_1.adminCurrentUser, 0);
    }
};
__decorate([
    common_1.Post('validate-user'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.ValidateUserDto]),
    __metadata("design:returntype", void 0)
], NestGraphqlAuthClientController.prototype, "validateUser", null);
__decorate([
    common_1.Post('sign-refresh-token'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NestGraphqlAuthClientController.prototype, "signRefreshToken", null);
NestGraphqlAuthClientController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [auth_service_1.NestGraphqlAuthService])
], NestGraphqlAuthClientController);
exports.NestGraphqlAuthClientController = NestGraphqlAuthClientController;
