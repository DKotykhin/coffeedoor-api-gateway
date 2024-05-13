import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsMobilePhone,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { DeliveryWay, OrderStatus } from '../../common/types/enums';

export class UpdateOrderDto {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiPropertyOptional()
  @IsString()
  @Length(2, 30, { message: 'Name must be between 2 and 30 characters' })
  userName?: string;

  @ApiPropertyOptional()
  @IsString()
  userId?: string;

  @ApiPropertyOptional()
  @IsString()
  @Length(10, 13, { message: 'Phone must be between 10 and 13 characters' })
  @IsMobilePhone('uk-UA')
  phoneNumber?: string;

  @ApiPropertyOptional()
  @IsEnum(DeliveryWay)
  deliveryWay?: DeliveryWay | string;

  @ApiPropertyOptional()
  @IsString()
  @Length(2, 200, { message: 'Address must be between 2 and 200 characters' })
  deliveryAddress?: string;

  @ApiPropertyOptional()
  @IsEnum(OrderStatus)
  orderStatus?: OrderStatus | string;

  @ApiPropertyOptional()
  @IsString()
  @Length(2, 500, { message: 'Address must be between 2 and 500 characters' })
  comment?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsPositive()
  totalSum?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsPositive()
  averageSum?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsPositive()
  totalQuantity?: number;
}
