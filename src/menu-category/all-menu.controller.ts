import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { LanguageCode } from '../types/enums';
import { MenuCategoryService } from './menu-category.service';
import { MenuCategoryWithMenuItems } from './menu-category.pb';

@ApiTags('all-menu')
@Controller('all-menu')
export class AllMenuController {
  constructor(private readonly menuCategoryService: MenuCategoryService) {}

  @Get()
  @ApiOperation({ summary: 'Get menu by language' })
  getMenuByLanguage(
    @Query('language') language: LanguageCode,
  ): Promise<MenuCategoryWithMenuItems[]> {
    return this.menuCategoryService.getMenuByLanguage(language);
  }
}
