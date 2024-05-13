import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { StoreItemService } from './store-item.service';
import { StoreItemWithAdDto } from './dto/store-item-with-ad.dto';

@ApiTags('store-item-with-ad')
@Controller('store-item-with-ad')
export class StoreItemWithAdController {
  constructor(private readonly storeItemService: StoreItemService) {}

  @Get(':slug')
  @ApiOperation({ summary: 'Get store item by slug with recommendation' })
  @ApiResponse({ status: 200, type: StoreItemWithAdDto })
  getStoreItemBySlugWithAd(
    @Param('slug') slug: string,
  ): Promise<StoreItemWithAdDto> {
    return this.storeItemService.getStoreItemBySlugWithAd(slug);
  }
}
