import { SetMetadata } from '@nestjs/common';
import { RoleTypes } from '../dto/roles.dto';

export const ROLES_KEY = 'roles';

export const HasRoles = (...roles: RoleTypes[]) =>
  SetMetadata(ROLES_KEY, roles);
