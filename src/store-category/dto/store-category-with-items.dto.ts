import { ApiProperty } from '@nestjs/swagger';

import { StoreItemWithImagesDto } from '../../store-item/dto/store-item-with-images.dto';
import { StoreCategoryDto } from './store-category.dto';

export class StoreCategoryWithItemsDto extends StoreCategoryDto {
  @ApiProperty({ type: StoreItemWithImagesDto, isArray: true })
  storeItems: StoreItemWithImagesDto[];
}
