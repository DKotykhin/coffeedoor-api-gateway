import { ApiProperty } from '@nestjs/swagger';

import { StoreItemDto } from '../../store-item/dto/store-item.dto';
import { StoreCategoryDto } from './store-category.dto';

export class StoreCategoryWithItemsDto extends StoreCategoryDto {
  @ApiProperty({ type: StoreItemDto, isArray: true })
  storeItems: StoreItemDto[];
}
