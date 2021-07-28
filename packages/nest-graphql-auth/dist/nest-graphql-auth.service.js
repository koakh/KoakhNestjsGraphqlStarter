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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestGraphqlAuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const constants_1 = require("./constants");
let NestGraphqlAuthService = class NestGraphqlAuthService {
    constructor(authModuleOptions, jwtService) {
        this.authModuleOptions = authModuleOptions;
        this.jwtService = jwtService;
        this.bcryptValidate = (password, hashPassword) => {
            return bcrypt.compareSync(password, hashPassword);
        };
        this.userService = authModuleOptions.userService;
        this.logger = new common_1.Logger('NestGraphqlAuthService');
        this.logger.log(`Options: ${JSON.stringify(this.authModuleOptions)}`);
    }
    // TODO remove
    test() {
        return __awaiter(this, void 0, void 0, function* () {
            return 'Hello from NestGraphqlAuthModule!';
        });
    }
    // called by GqlLocalAuthGuard
    validateUser(username, pass) {
        return __awaiter(this, void 0, void 0, function* () {
            debugger;
            common_1.Logger.log(this.userService);
            const user = yield this.userService.findOneByField(constants_1.FIND_ONE_BY_FIELD, username);
            if (user && user.password) {
                const authorized = this.bcryptValidate(pass, user.password);
                if (authorized) {
                    // this will remove password from result leaving all the other properties
                    const { password } = user, result = __rest(user, ["password"]);
                    // we could do a database lookup in our validate() method to extract more information about the user,
                    // resulting in a more enriched user object being available in our Request
                    return result;
                }
            }
            return null;
        });
    }
    signJwtToken(signPayload, options) {
        return __awaiter(this, void 0, void 0, function* () {
            // note: we choose a property name of sub to hold our userId value to be consistent with JWT standards
            const payload = { username: signPayload.username, sub: signPayload.userId, roles: signPayload.roles };
            return {
                // generate JWT from a subset of the user object properties
                accessToken: this.jwtService.sign(payload, options),
            };
        });
    }
    signRefreshToken(signPayload, tokenVersion, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = { username: signPayload.username, sub: signPayload.userId, roles: signPayload.roles, tokenVersion };
            return {
                // generate JWT from a subset of the user object properties
                accessToken: this.jwtService.sign(payload, Object.assign(Object.assign({}, options), { expiresIn: this.authModuleOptions.expiresIn })),
            };
        });
    }
    sendRefreshToken(res, { accessToken }) {
        // res cookie require import { Response } from 'express';
        res.cookie('jid', accessToken, {
            // prevent javascript access
            httpOnly: true,
        });
    }
    getJwtPayLoad(token) {
        return this.jwtService.verify(token);
    }
};
NestGraphqlAuthService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(constants_1.NEST_GRAPHQL_AUTH_OPTIONS)),
    __metadata("design:paramtypes", [Object, jwt_1.JwtService])
], NestGraphqlAuthService);
exports.NestGraphqlAuthService = NestGraphqlAuthService;
