import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { User } from '../decorators/user.decorator';

import type { CanActivate, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

@Injectable()
export class RoleAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  public canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request & { user: User }>();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException();
    }

    const roles = this._getRolesMetadataFromContext(context);

    if (!roles.length) {
      return true;
    }

    if (!roles.includes(user.role)) {
      throw new ForbiddenException();
    }

    return true;
  }

  private _getRolesMetadataFromContext(ctx: ExecutionContext): string[] {
    let roles: string[];

    roles = this.reflector.get<string[]>('roles', ctx.getHandler());

    if (!roles) {
      roles = this.reflector.get<string[]>('roles', ctx.getClass());
    }

    return roles;
  }
}
