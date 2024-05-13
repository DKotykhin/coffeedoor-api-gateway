import { ApiProperty } from '@nestjs/swagger';
import { DeliveryWay, OrderStatus } from '../../common/types/enums';

export class OrderDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  userName: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty({ enum: DeliveryWay })
  deliveryWay: DeliveryWay | string;

  @ApiProperty()
  deliveryAddress: string;

  @ApiProperty({ enum: OrderStatus })
  orderStatus: OrderStatus | string;

  @ApiProperty()
  comment: string;

  @ApiProperty()
  totalSum: number;

  @ApiProperty()
  averageSum: number;

  @ApiProperty()
  totalQuantity: number;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;
}
