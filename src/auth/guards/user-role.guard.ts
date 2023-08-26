import { Reflector } from '@nestjs/core';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  BadRequestException,
  ForbiddenException
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { METADATA_REQUEST_ROLES } from '../constants/metadata-request';
import { User } from 'src/entities';
import { UserRole } from 'src/common/constants/types';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const handlerValidRole: UserRole = this.reflector.get(
      METADATA_REQUEST_ROLES,
      context.getHandler()
    );

    const classValidRole: UserRole = this.reflector.get(
      METADATA_REQUEST_ROLES,
      context.getClass()
    );

    const validRoles = [handlerValidRole, classValidRole];
    if (validRoles.every((role) => !role)) return true;

    const req = context.switchToHttp().getRequest();
    const user = req.user as User;

    if (!user) throw new BadRequestException('User not found');

    const isValidRole = validRoles.filter(
      (validRole) => validRole === user.role
    );

    if (isValidRole.length === 1) return true;

    throw new ForbiddenException(
      `User with role ${user.role} cannot access to a route protected to ${
        validRoles[0] || validRoles[1]
      }`
    );
  }
}
