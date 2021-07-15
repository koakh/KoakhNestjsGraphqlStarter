import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GqlRolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context);
    // if subscriptions/webSockets, we must get user payload from connection.context
    const req = (ctx.getContext().req)
      ? ctx.getContext().req
      : ctx.getContext().connection.context;

    const { user: { userId, username, roles: userRoles } } = req;
    // Logger.log(`roles: [${roles}], userRoles: [${userRoles}]`, GqlRolesGuard.name);

    const hasRole = () =>
      userRoles.some(role => !!roles.find(item => item === role));

    return userId && userRoles && hasRole();
  }
}
