import { ApiProperty } from '@nestjs/swagger';
import { IdDto } from '../../common/dto/id.dto';

export class OrderItemDto {
  @ApiProperty()
  id: string;

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

  @ApiProperty()
  weight: number;

  @ApiProperty({ type: IdDto })
  order?: IdDto;
}
