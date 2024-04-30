import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { LanguageCode, RoleTypes } from '../types/enums';
import { HasRoles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { MenuCategoryService } from './menu-category.service';
import {
  ChangeMenuCategoryPositionDto,
  CreateMenuCategoryDto,
  UpdateMenuCategoryDto,
} from './dto/_index';
import {
  MenuCategories,
  MenuCategory,
  StatusResponse,
} from './menu-category.pb';

@ApiTags('menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuCategoryService: MenuCategoryService) {}

  @Get()
  findByLanguage(
    @Query('language') language: LanguageCode,
  ): Promise<MenuCategories> {
    return this.menuCategoryService.findByLanguage(language);
  }
}

@ApiTags('menu-categories')
@ApiBearerAuth()
@Controller('menu-categories')
@HasRoles(RoleTypes.ADMIN, RoleTypes.SUBADMIN)
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class MenuCategoryController {
  constructor(private readonly menuCategoryService: MenuCategoryService) {}

  @Get()
  findAll(): Promise<MenuCategories> {
    return this.menuCategoryService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<MenuCategory> {
    return this.menuCategoryService.findById(id);
  }

  @Post()
  create(
    @Body() createMenuCategoryDto: CreateMenuCategoryDto,
  ): Promise<MenuCategory> {
    return this.menuCategoryService.create(createMenuCategoryDto);
  }

  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateMenuCategoryDto: UpdateMenuCategoryDto,
  ): Promise<MenuCategory> {
    return this.menuCategoryService.update(id, updateMenuCategoryDto);
  }

  @Patch('change-position')
  changePosition(
    @Body() changeMenuCategoryPositionDto: ChangeMenuCategoryPositionDto,
  ): Promise<MenuCategory> {
    return this.menuCategoryService.changePosition(
      changeMenuCategoryPositionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<StatusResponse> {
    return this.menuCategoryService.remove(id);
  }
}
