import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum } from 'class-validator';

import { RoleTypes } from '../../common/types/enums';

export class ChangeUserRoleDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({
    enum: RoleTypes,
    enumName: 'RoleTypes',
  })
  @IsEnum(RoleTypes)
  role: RoleTypes | string;
}
