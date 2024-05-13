import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateOrderDto {
  @ApiProperty()
  id: string;

  @ApiPropertyOptional()
  userName?: string;

  @ApiPropertyOptional()
  userId?: string;

  @ApiPropertyOptional()
  phoneNumber?: string;

  @ApiPropertyOptional()
  deliveryWay?: string;

  @ApiPropertyOptional()
  deliveryAddress?: string;

  @ApiPropertyOptional()
  orderStatus?: string;

  @ApiPropertyOptional()
  comment?: string;

  @ApiPropertyOptional()
  totalSum?: number;

  @ApiPropertyOptional()
  averageSum?: number;

  @ApiPropertyOptional()
  totalQuantity?: number;
}
