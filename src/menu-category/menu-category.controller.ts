import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { RoleTypes } from '../types/enums';
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
  MenuCategory,
  MenuCategoryWithMenuItems,
  StatusResponse,
} from './menu-category.pb';

@ApiTags('menu-categories')
@ApiBearerAuth()
@Controller('menu-categories')
@HasRoles(RoleTypes.ADMIN, RoleTypes.SUBADMIN)
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class MenuCategoryController {
  constructor(private readonly menuCategoryService: MenuCategoryService) {}

  @Get()
  getMenuCategories(): Promise<MenuCategoryWithMenuItems[]> {
    return this.menuCategoryService.getMenuCategories();
  }

  @Get(':id')
  getMenuCategoryById(
    @Param('id') id: string,
  ): Promise<MenuCategoryWithMenuItems> {
    return this.menuCategoryService.getMenuCategoryById(id);
  }

  @Post()
  createMenuCategory(
    @Body() createMenuCategoryDto: CreateMenuCategoryDto,
  ): Promise<MenuCategory> {
    return this.menuCategoryService.createMenuCategory(createMenuCategoryDto);
  }

  @Patch('update/:id')
  updateMenuCategory(
    @Param('id') id: string,
    @Body() updateMenuCategoryDto: UpdateMenuCategoryDto,
  ): Promise<MenuCategory> {
    return this.menuCategoryService.updateMenuCategory(
      id,
      updateMenuCategoryDto,
    );
  }

  @Patch('change-position')
  changeMenuCategoryPosition(
    @Body() changeMenuCategoryPositionDto: ChangeMenuCategoryPositionDto,
  ): Promise<MenuCategory> {
    return this.menuCategoryService.changeMenuCategoryPosition(
      changeMenuCategoryPositionDto,
    );
  }

  @Delete(':id')
  deleteMenuCategory(@Param('id') id: string): Promise<StatusResponse> {
    return this.menuCategoryService.deleteMenuCategory(id);
  }
}
