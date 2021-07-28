"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GqlAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const passport_1 = require("@nestjs/passport");
let GqlAuthGuard = class GqlAuthGuard extends passport_1.AuthGuard('jwt') {
    getRequest(context) {
        const ctx = graphql_1.GqlExecutionContext.create(context);
        // req used in http queries and mutations, connection is used in websocket subscription connections, check AppModule
        const { req, connection } = ctx.getContext();
        // the req parameter will contain a user property
        // (populated by Passport during the passport-local authentication flow)
        // const authorization: string = (req.headers.authorization)
        //   ? req.headers.authorization
        //   : null;
        // if (authorization) {
        //   const token: string = authorization.toLowerCase().replace('bearer ', '');
        //   const validToken = this.jwtService.verify(token);
        // }
        // if subscriptions/webSockets, let it pass headers from connection.context to passport-jwt
        return (connection && connection.context && connection.context.headers)
            ? connection.context
            : req;
    }
};
GqlAuthGuard = __decorate([
    common_1.Injectable()
], GqlAuthGuard);
exports.GqlAuthGuard = GqlAuthGuard;
