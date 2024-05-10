import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { LanguageCode } from '../types/enums';
import { MenuCategoryService } from './menu-category.service';
import { MenuCategoryWithMenuItems } from './menu-category.pb';

@ApiTags('all-menu')
@Controller('all-menu')
export class AllMenuController {
  constructor(private readonly menuCategoryService: MenuCategoryService) {}

  @Get()
  getMenuByLanguage(
    @Query('language') language: LanguageCode,
  ): Promise<MenuCategoryWithMenuItems[]> {
    return this.menuCategoryService.getMenuByLanguage(language);
  }
}
