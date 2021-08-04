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
exports.NestGraphqlAuthResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const abstracts_1 = require("./abstracts");
const constants_1 = require("./constants");
const decorators_1 = require("./decorators");
const enums_1 = require("./enums");
const guards_1 = require("./guards");
const input_types_1 = require("./input-types");
const nest_graphql_auth_service_1 = require("./nest-graphql-auth.service");
const object_types_1 = require("./object-types");
const pubSub = new graphql_subscriptions_1.PubSub();
let NestGraphqlAuthResolver = class NestGraphqlAuthResolver {
    constructor(
    // AuthModule providers
    authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    userLogin(loginUserData, { res, payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            // publish userLogged subscription
            pubSub.publish(enums_1.SubscriptionEvent.userLogged, { [enums_1.SubscriptionEvent.userLogged]: loginUserData.username });
            // get user
            const user = yield this.userService.findOneByField(constants_1.FIND_ONE_BY_FIELD, loginUserData.username);
            // accessToken: add some user data to it, like id and roles
            const signJwtTokenDto = Object.assign(Object.assign({}, loginUserData), { userId: user.id, roles: user.roles });
            const { accessToken } = yield this.authService.signJwtToken(signJwtTokenDto);
            // assign jwt Payload to context
            payload = this.authService.getJwtPayLoad(accessToken);
            // get incremented tokenVersion
            const tokenVersion = this.authService.authStore.incrementTokenVersion(loginUserData.username);
            // refreshToken
            const refreshToken = yield this.authService.signRefreshToken(signJwtTokenDto, tokenVersion);
            // send jid cookie refresh token to client (browser, insomnia etc)
            this.authService.sendRefreshToken(res, refreshToken);
            // return loginUserResponse
            return { user: user, accessToken };
        });
    }
    userLogout(currentUser, { res, payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            // always incrementVersion this way user can't use refreshToken anymore
            this.authService.authStore.incrementTokenVersion(currentUser.username);
            // send empty refreshToken, with same name jid, etc, better than res.clearCookie
            // this will invalidate the browser cookie refreshToken, only work with browser, not with insomnia etc
            this.authService.sendRefreshToken(res, { accessToken: '' });
            return true;
        });
    }
    // Don't expose this resolver, only used in development environments
    revokeUserRefreshTokens(username) {
        return __awaiter(this, void 0, void 0, function* () {
            // invalidate user tokens increasing tokenVersion, this way last tokenVersion of refreshToken will be invalidate
            // when user tries to use it in /refresh-token and current version is greater than refreshToken.tokenVersion
            this.authService.authStore.incrementTokenVersion(username);
            return true;
        });
    }
    userLogged(currentUser) {
        return pubSub.asyncIterator(enums_1.SubscriptionEvent.userLogged);
    }
};
__decorate([
    common_1.UseGuards(guards_1.GqlLocalAuthGuard),
    graphql_1.Mutation(returns => object_types_1.UserLoginResponse),
    __param(0, graphql_1.Args('loginUserData')),
    __param(1, graphql_1.Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [input_types_1.LoginUserInput, Object]),
    __metadata("design:returntype", Promise)
], NestGraphqlAuthResolver.prototype, "userLogin", null);
__decorate([
    decorators_1.Roles(enums_1.UserRoles.ROLE_USER),
    common_1.UseGuards(guards_1.GqlRolesGuard),
    common_1.UseGuards(guards_1.GqlAuthGuard),
    graphql_1.Mutation(returns => Boolean),
    __param(0, decorators_1.CurrentUser()),
    __param(1, graphql_1.Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], NestGraphqlAuthResolver.prototype, "userLogout", null);
__decorate([
    decorators_1.Roles(enums_1.UserRoles.ROLE_ADMIN),
    graphql_1.Mutation(returns => Boolean),
    __param(0, graphql_1.Args('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NestGraphqlAuthResolver.prototype, "revokeUserRefreshTokens", null);
__decorate([
    decorators_1.Roles(enums_1.UserRoles.ROLE_USER),
    common_1.UseGuards(guards_1.GqlRolesGuard),
    graphql_1.Subscription(returns => String),
    __param(0, decorators_1.CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NestGraphqlAuthResolver.prototype, "userLogged", null);
NestGraphqlAuthResolver = __decorate([
    graphql_1.Resolver(),
    __param(1, common_1.Inject(constants_1.NEST_GRAPHQL_USER_SERVICE)),
    __metadata("design:paramtypes", [nest_graphql_auth_service_1.NestGraphqlAuthService,
        abstracts_1.UserServiceAbstract])
], NestGraphqlAuthResolver);
exports.NestGraphqlAuthResolver = NestGraphqlAuthResolver;
