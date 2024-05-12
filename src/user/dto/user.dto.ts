import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RoleTypes } from '../../common/types/enums';

export class UserDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userName: string;

  @ApiProperty()
  email: string;

  @ApiPropertyOptional()
  address?: string;

  @ApiPropertyOptional()
  phoneNumber?: string;

  @ApiPropertyOptional()
  avatar?: string;

  @ApiProperty()
  isVerified: boolean;

  @ApiProperty({ enum: RoleTypes })
  role: RoleTypes | string;
}
