import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateOrderItemDto {
  @ApiPropertyOptional()
  price?: number;

  @ApiPropertyOptional()
  quantity?: number;

  @ApiPropertyOptional()
  weight?: number;
}
