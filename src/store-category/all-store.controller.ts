import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';

import { LanguageCode } from '../common/types/enums';
import { LanguageDto } from '../common/dto/_index';

import { StoreCategoryService } from './store-category.service';
import { StoreCategoryWithItemsDto } from './dto/store-category-with-items.dto';

@ApiTags('all-store')
@Controller('all-store')
@UseInterceptors(CacheInterceptor)
export class AllStoreController {
  constructor(private readonly storeCategoryService: StoreCategoryService) {}

  @Get()
  @ApiOperation({ summary: 'Get store by language' })
  @ApiResponse({ type: StoreCategoryWithItemsDto, isArray: true })
  @ApiQuery({ name: 'language', enum: LanguageCode, required: true })
  getStoreByLanguage(
    @Query() languageDto: LanguageDto,
  ): Promise<StoreCategoryWithItemsDto[]> {
    return this.storeCategoryService.getStoreByLanguage(languageDto.language);
  }
}
