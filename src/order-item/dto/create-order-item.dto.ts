import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IdDto } from '../../common/dto/id.dto';

export class CreateOrderItemDto {
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

  @ApiProperty({ type: IdDto })
  order: IdDto;
}
