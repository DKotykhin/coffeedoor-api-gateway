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

import { LanguageCode, MenuCategory, StatusResponseDto } from '../types/_index';
import { MenuCategoryService } from './menu-category.service';
import {
  ChangeMenuCategoryPositionDto,
  CreateMenuCategoryDto,
  UpdateMenuCategoryDto,
} from './dto/_index';

@Controller('all-menu')
export class AllMenuController {
  constructor(private readonly menuCategoryService: MenuCategoryService) {}

  @Get()
  findByLanguage(@Query('language') language: LanguageCode): Promise<any> {
    return this.menuCategoryService.findByLanguage(language);
  }
}
@Controller('menu-categories')
export class MenuCategoryController {
  constructor(private readonly menuCategoryService: MenuCategoryService) {}

  @Get()
  findAll(): Promise<Observable<MenuCategory[]>> {
    return this.menuCategoryService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Observable<MenuCategory>> {
    return this.menuCategoryService.findById(id);
  }

  @Post()
  create(
    @Body() createMenuCategoryDto: CreateMenuCategoryDto,
  ): Promise<Observable<MenuCategory>> {
    return this.menuCategoryService.create(createMenuCategoryDto);
  }

  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateMenuCategoryDto: UpdateMenuCategoryDto,
  ): Promise<Observable<MenuCategory>> {
    return this.menuCategoryService.update(id, updateMenuCategoryDto);
  }

  @Patch('change-position')
  changePosition(
    @Body() changeMenuCategoryPositionDto: ChangeMenuCategoryPositionDto,
  ): Promise<Observable<MenuCategory>> {
    return this.menuCategoryService.changePosition(
      changeMenuCategoryPositionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Observable<StatusResponseDto>> {
    return this.menuCategoryService.remove(id);
  }
}
