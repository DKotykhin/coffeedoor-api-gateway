import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsPositive } from 'class-validator';

export class UpdateOrderItemDto {
  @ApiPropertyOptional()
  @IsNumber()
  price?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsPositive()
  quantity?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsPositive()
  weight?: number;
}
