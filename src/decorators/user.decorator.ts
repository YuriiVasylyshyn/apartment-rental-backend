import { createParamDecorator } from '@nestjs/common';

import { Role } from '../modules/user/enums/role.enum';

import type { ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

export interface User {
  id: string;
  role: Role;

  [key: string]: unknown;
}

export const AuthorizedUser = createParamDecorator((_data: unknown, ctx: ExecutionContext): User | null => {
  const request = ctx.switchToHttp().getRequest<Request & { user: User }>();
  const { id, role } = request.user ?? {};

  if (!id || !role) {
    return null;
  }

  return { id, role };
});
