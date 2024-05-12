import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { LanguageCode } from '../common/types/enums';
import { MenuCategoryService } from './menu-category.service';
import { MenuCategoryWithMenuItems } from './menu-category.pb';

@ApiTags('all-menu')
@Controller('all-menu')
export class AllMenuController {
  constructor(private readonly menuCategoryService: MenuCategoryService) {}

  @Get()
  @ApiOperation({ summary: 'Get menu by language' })
  @ApiQuery({ name: 'language', enum: LanguageCode, required: true })
  getMenuByLanguage(
    @Query('language') language: LanguageCode,
  ): Promise<MenuCategoryWithMenuItems[]> {
    return this.menuCategoryService.getMenuByLanguage(language);
  }
}
