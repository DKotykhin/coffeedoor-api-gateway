import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangeMenuItemPositionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  menuItemId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  oldPosition: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  newPosition: number;
}
