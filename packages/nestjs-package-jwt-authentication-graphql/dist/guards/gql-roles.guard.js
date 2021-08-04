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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GqlRolesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const graphql_1 = require("@nestjs/graphql");
let GqlRolesGuard = class GqlRolesGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const roles = this.reflector.get('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const ctx = graphql_1.GqlExecutionContext.create(context);
        // if subscriptions/webSockets, we must get user payload from connection.context
        const req = (ctx.getContext().req)
            ? ctx.getContext().req
            : ctx.getContext().connection.context;
        // init variables placeHolders
        let userId, username, userRoles;
        if (req.jwtPayload) {
            // is used when work with subscriptions, else "Cannot read property 'userId' of undefined"
            ({ sub: userId, username, roles: userRoles } = req.jwtPayload);
        }
        else {
            // used in non subscriptions mode
            ({ user: { userId, username, roles: userRoles } } = req);
        }
        // Logger.log(`roles: [${roles}], userRoles: [${userRoles}]`, GqlRolesGuard.name);
        const hasRole = () => {
            return userRoles.some(role => !!roles.find(item => item === role));
        };
        return userId && userRoles && hasRole();
    }
};
GqlRolesGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [core_1.Reflector])
], GqlRolesGuard);
exports.GqlRolesGuard = GqlRolesGuard;
