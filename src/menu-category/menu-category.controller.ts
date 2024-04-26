import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { LanguageCode, StatusResponseDto } from '../types/_index';
import { MenuCategoryService } from './menu-category.service';
import {
  ChangeMenuCategoryPositionDto,
  CreateMenuCategoryDto,
  UpdateMenuCategoryDto,
} from './dto/_index';
import { MenuCategories, MenuCategory } from './menu-category.pb';

@Controller('all-menu')
export class AllMenuController {
  constructor(private readonly menuCategoryService: MenuCategoryService) {}

  @Get()
  findByLanguage(
    @Query('language') language: LanguageCode,
  ): Observable<MenuCategories> {
    return this.menuCategoryService.findByLanguage(language);
  }
}
@Controller('menu-categories')
export class MenuCategoryController {
  constructor(private readonly menuCategoryService: MenuCategoryService) {}

  @Get()
  findAll(): Observable<MenuCategories> {
    return this.menuCategoryService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Observable<MenuCategory> {
    return this.menuCategoryService.findById(id);
  }

  @Post()
  create(
    @Body() createMenuCategoryDto: CreateMenuCategoryDto,
  ): Observable<MenuCategory> {
    return this.menuCategoryService.create(createMenuCategoryDto);
  }

  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateMenuCategoryDto: UpdateMenuCategoryDto,
  ): Observable<MenuCategory> {
    return this.menuCategoryService.update(id, updateMenuCategoryDto);
  }

  @Patch('change-position')
  changePosition(
    @Body() changeMenuCategoryPositionDto: ChangeMenuCategoryPositionDto,
  ): Observable<MenuCategory> {
    return this.menuCategoryService.changePosition(
      changeMenuCategoryPositionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string): Observable<StatusResponseDto> {
    return this.menuCategoryService.remove(id);
  }
}
