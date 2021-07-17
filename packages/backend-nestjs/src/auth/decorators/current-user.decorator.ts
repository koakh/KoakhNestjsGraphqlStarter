// changed in nestjs 8.0.3
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    if (ctx.getContext().req) {
      // normal mode
      return ctx.getContext().req.user;
    } else {
      // if subscriptions/webSockets, we must use connection.context.jwtPayload
      return ctx.getContext().connection.context.jwtPayload.username;
    }
  },
);
