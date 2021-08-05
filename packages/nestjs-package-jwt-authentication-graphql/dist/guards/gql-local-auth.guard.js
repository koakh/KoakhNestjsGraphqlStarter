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
exports.GqlLocalAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const auth_service_1 = require("../auth.service");
let GqlLocalAuthGuard = class GqlLocalAuthGuard {
    constructor(authService) {
        this.authService = authService;
    }
    canActivate(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const ctx = graphql_1.GqlExecutionContext.create(context);
            // get loginUserData from context args
            const loginUserData = ctx.getArgs().loginUserData;
            // call authService validateUser
            const user = yield this.authService.validateUser(loginUserData.username, loginUserData.password);
            // if not null is valid
            return (user);
        });
    }
    /**
     * Passport expects a validate() method with the following signature: validate(username: string, password:string): any
     */
    validate(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.authService.validateUser(username, password);
            debugger;
            if (!user) {
                throw new common_1.UnauthorizedException();
            }
            return user;
        });
    }
};
GqlLocalAuthGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], GqlLocalAuthGuard);
exports.GqlLocalAuthGuard = GqlLocalAuthGuard;
//# sourceMappingURL=gql-local-auth.guard.js.map