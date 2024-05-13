import { ApiProperty } from '@nestjs/swagger';

import { StoreItemWithImagesDto } from './store-item-with-images.dto';

export class StoreItemWithAdDto {
  @ApiProperty({ type: StoreItemWithImagesDto })
  storeItem?: StoreItemWithImagesDto;

  @ApiProperty({ type: StoreItemWithImagesDto, isArray: true })
  adList: StoreItemWithImagesDto[];
}
