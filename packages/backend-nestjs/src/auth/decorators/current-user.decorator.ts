// [CurrentUser = Custom Decorator](https://docs.nestjs.com/techniques/authentication#graphql)
// tslint:disable-next-line: max-line-length
// [NestJS Get current user in GraphQL resolver authenticated with JWT](https://stackoverflow.com/questions/55269777/nestjs-get-current-user-in-graphql-resolver-authenticated-with-jwt)
// not used yet
// use with @CurrentUser() decorator query/mutation

import { createParamDecorator } from '@nestjs/common';

// used without subscriptions, here we ger user from request, in subscription we must use req or context
// export const CurrentUser = createParamDecorator(
//   (data, [root, args, ctx, info]) => ctx.req.user,
// );

export const CurrentUser = createParamDecorator(
  (data, [root, args, ctx, info]) => {
    const req = (ctx.req) ? ctx.req : ctx.connection.context;
    return req.user
  },
);
