import { Injectable, CanActivate, ExecutionContext, ForbiddenException, mixin } from '@nestjs/common';
import { Request } from 'express';

import { User } from 'src/user/user.model';
import { Role } from 'src/user/user.role.model';
import { authErrorMessages } from 'src/auth/auth.constants';
import { UserRoles } from 'src/user/user.enums';
import { getRoleAccessLevel } from 'src/user/user.utils';

export const AuthRoleGuard = (role: UserRoles) => {
  @Injectable()
  class AuthRoleGuardMixin implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request: Request = context.switchToHttp().getRequest();
      const user: User = request.user as User;
      const userRole: Role = await user.$get('role');

      if (userRole.accessLevel > getRoleAccessLevel(role)) {
        throw new ForbiddenException(authErrorMessages.roleMissmatch);
      }

      return true;
    }
  }

  return mixin(AuthRoleGuardMixin);
};
