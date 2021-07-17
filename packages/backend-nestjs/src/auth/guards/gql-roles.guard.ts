import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
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
    // init variables placeHolders
    let userId, username, userRoles;
    if (req.jwtPayload) {
      // is used when work with subscriptions, else "Cannot read property 'userId' of undefined"
      ({ sub: userId, username, roles: userRoles } = req.jwtPayload);
    } else {
      // used in non subscriptions mode
      ({ user: { userId, username, roles: userRoles } } = req);
    }
    // Logger.log(`roles: [${roles}], userRoles: [${userRoles}]`, GqlRolesGuard.name);
    const hasRole = () => {
      return userRoles.some(role => !!roles.find(item => item === role));
    };
    return userId && userRoles && hasRole();
  }
}
