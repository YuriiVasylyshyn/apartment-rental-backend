import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RoleAuthGuard } from '../guards/role-auth.guard';

import type { Role } from '../modules/user/enums/role.enum';

export function Protected(...roles: Role[]): ReturnType<typeof applyDecorators> {
  return applyDecorators(SetMetadata('roles', roles), UseGuards(JwtAuthGuard, RoleAuthGuard));
}
