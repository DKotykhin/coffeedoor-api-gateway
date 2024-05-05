import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { StoreItemService } from './store-item.service';
import { StoreItemWithAd } from './store-item.pb';

@ApiTags('store-item-with-ad')
@Controller('store-item-with-ad')
export class StoreItemWithAdController {
  constructor(private readonly storeItemService: StoreItemService) {}

  @Get(':slug')
  findBySlugWithAd(@Param('slug') slug: string): Promise<StoreItemWithAd> {
    return this.storeItemService.findBySlugWithAd(slug);
  }
}
