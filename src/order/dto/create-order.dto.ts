import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsMobilePhone,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

import { DeliveryWay, OrderStatus } from '../../common/types/enums';

class UserOrder {
  @ApiProperty()
  @IsString()
  @Length(2, 30, { message: 'Name must be between 2 and 30 characters' })
  userName: string;

  @ApiProperty()
  @IsString()
  @Length(10, 13, { message: 'Phone must be between 10 and 13 characters' })
  @IsMobilePhone('uk-UA')
  phoneNumber: string;

  @ApiPropertyOptional()
  @IsString()
  userId?: string;

  @ApiPropertyOptional()
  @IsEnum(DeliveryWay)
  deliveryWay?: DeliveryWay | string;

  @ApiPropertyOptional()
  @IsEnum(OrderStatus)
  orderStatus?: OrderStatus | string;

  @ApiPropertyOptional()
  @IsString()
  @Length(2, 200, { message: 'Address must be between 2 and 200 characters' })
  deliveryAddress?: string;

  @ApiPropertyOptional()
  @IsString()
  @Length(2, 500, { message: 'Address must be between 2 and 500 characters' })
  comment?: string;
}

class UserOrderItem {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  categoryTitle: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  itemTitle: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  quantity: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsPositive()
  weight?: number;
}

export class CreateOrderDto {
  @ApiProperty({ type: UserOrder })
  userOrder?: UserOrder;

  @ApiProperty({ type: UserOrderItem, isArray: true })
  orderItems: UserOrderItem[];
}
