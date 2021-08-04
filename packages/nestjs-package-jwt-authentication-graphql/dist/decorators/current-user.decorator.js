"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = void 0;
// changed in nestjs 8.0.3
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
exports.CurrentUser = common_1.createParamDecorator((data, context) => {
    const ctx = graphql_1.GqlExecutionContext.create(context);
    if (ctx.getContext().req) {
        // normal mode
        return ctx.getContext().req.user;
    }
    else {
        // if subscriptions/webSockets, we must use connection.context.jwtPayload
        return ctx.getContext().connection.context.jwtPayload.username;
    }
});
