import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

import { LanguageCode } from '../common/types/enums';
import { MenuCategoryService } from './menu-category.service';
import { MenuCategoryWithMenuItemsDto } from './dto/menu-category-with-menu-items.dto';

@ApiTags('all-menu')
@Controller('all-menu')
@UseInterceptors(CacheInterceptor)
@CacheTTL(60 * 1000)
export class AllMenuController {
  constructor(private readonly menuCategoryService: MenuCategoryService) {}

  @Get()
  @ApiOperation({ summary: 'Get menu by language' })
  @ApiQuery({ name: 'language', enum: LanguageCode, required: true })
  getMenuByLanguage(
    @Query('language') language: LanguageCode,
  ): Promise<MenuCategoryWithMenuItemsDto[]> {
    return this.menuCategoryService.getMenuByLanguage(language);
  }
}
