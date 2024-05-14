import { ApiProperty } from '@nestjs/swagger';

import { StoreItemDto } from './store-item.dto';
import { StoreItemImageDto } from '../../store-item-image/dto/store-item-image.dto';

export class StoreItemWithImagesDto extends StoreItemDto {
  @ApiProperty({ type: StoreItemImageDto, isArray: true })
  images?: StoreItemImageDto[];

  @ApiProperty({ type: 'string', isArray: true })
  imageUrl?: string[];
}
