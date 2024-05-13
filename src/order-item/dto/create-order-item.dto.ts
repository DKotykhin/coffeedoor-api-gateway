import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmptyObject,
  IsNumber,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { IdDto } from '../../common/dto/id.dto';

export class CreateOrderItemDto {
  @ApiProperty()
  @IsString()
  slug: string;

  @ApiProperty()
  @IsString()
  categoryTitle: string;

  @ApiProperty()
  @IsString()
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

  @ApiProperty({ type: IdDto })
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => IdDto)
  order: IdDto;
}
