import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  protected readonly logger = new Logger(RolesGuard.name);

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    const isVerified = requiredRoles.some((role) => req.user.role === role);
    if (!isVerified) {
      this.logger.error(
        `User with role ${req.user.role} doesn't have permission to access this resource!`,
      );
      throw new HttpException(
        "You don't have permission to access this resource!",
        HttpStatus.FORBIDDEN,
      );
    }
    return isVerified;
  }
}
