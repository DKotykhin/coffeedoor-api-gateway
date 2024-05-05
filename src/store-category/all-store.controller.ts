import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { LanguageCode } from '../types/enums';

import { StoreCategoryService } from './store-category.service';
import { StoreCategory } from './store-category.pb';

@ApiTags('all-store')
@Controller('all-store')
export class AllStoreController {
  constructor(private readonly storeCategoryService: StoreCategoryService) {}

  @Get()
  findByLanguage(
    @Query('language') language: LanguageCode,
  ): Promise<StoreCategory[]> {
    return this.storeCategoryService.findByLanguage(language);
  }
}
