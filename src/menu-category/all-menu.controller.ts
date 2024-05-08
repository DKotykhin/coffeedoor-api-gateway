import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { LanguageCode } from '../types/enums';
import { MenuCategoryService } from './menu-category.service';
import { MenuCategory } from './menu-category.pb';

@ApiTags('all-menu')
@Controller('all-menu')
export class AllMenuController {
  constructor(private readonly menuCategoryService: MenuCategoryService) {}

  @Get()
  findByLanguage(
    @Query('language') language: LanguageCode,
  ): Promise<MenuCategory[]> {
    return this.menuCategoryService.findByLanguage(language);
  }
}
