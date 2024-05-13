import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DeliveryWay } from '../../common/types/enums';

class UserOrder {
  @ApiProperty()
  userName: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiPropertyOptional()
  userId?: string;

  @ApiPropertyOptional()
  deliveryWay?: DeliveryWay | string;

  @ApiPropertyOptional()
  deliveryAddress?: string;

  @ApiPropertyOptional()
  comment?: string;
}

class UserOrderItem {
  @ApiProperty()
  slug: string;

  @ApiProperty()
  categoryTitle: string;

  @ApiProperty()
  itemTitle: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  quantity: number;

  @ApiPropertyOptional()
  weight?: number;
}

export class CreateOrderDto {
  @ApiProperty({ type: UserOrder })
  userOrder?: UserOrder;

  @ApiProperty({ type: UserOrderItem, isArray: true })
  orderItems: UserOrderItem[];
}
