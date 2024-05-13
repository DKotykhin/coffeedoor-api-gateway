import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { LanguageCode } from '../common/types/enums';

import { StoreCategoryService } from './store-category.service';
import { StoreCategoryWithItemsDto } from './dto/store-category-with-items.dto';

@ApiTags('all-store')
@Controller('all-store')
export class AllStoreController {
  constructor(private readonly storeCategoryService: StoreCategoryService) {}

  @Get()
  @ApiOperation({ summary: 'Get store by language' })
  @ApiResponse({ type: StoreCategoryWithItemsDto, isArray: true })
  @ApiQuery({ name: 'language', enum: LanguageCode, required: true })
  getStoreByLanguage(
    @Query('language') language: LanguageCode,
  ): Promise<StoreCategoryWithItemsDto[]> {
    return this.storeCategoryService.getStoreByLanguage(language);
  }
}
