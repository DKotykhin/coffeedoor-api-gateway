import { ApiProperty } from '@nestjs/swagger';

import { OrderItemDto } from '../../order-item/dto/order-item.dto';
import { OrderDto } from './order.dto';

export class OrderWithItemsDto extends OrderDto {
  @ApiProperty({ type: OrderItemDto, isArray: true })
  orderItem: OrderItemDto[];
}
