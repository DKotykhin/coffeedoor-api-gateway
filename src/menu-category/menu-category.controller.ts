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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

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
  @ApiOperation({ summary: 'Get all menu categories' })
  getMenuCategories(): Promise<MenuCategoryWithMenuItems[]> {
    return this.menuCategoryService.getMenuCategories();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a menu category by id' })
  getMenuCategoryById(
    @Param('id') id: string,
  ): Promise<MenuCategoryWithMenuItems> {
    return this.menuCategoryService.getMenuCategoryById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new menu category' })
  createMenuCategory(
    @Body() createMenuCategoryDto: CreateMenuCategoryDto,
  ): Promise<MenuCategory> {
    return this.menuCategoryService.createMenuCategory(createMenuCategoryDto);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update a menu category' })
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
  @ApiOperation({ summary: 'Change menu category position' })
  changeMenuCategoryPosition(
    @Body() changeMenuCategoryPositionDto: ChangeMenuCategoryPositionDto,
  ): Promise<MenuCategory> {
    return this.menuCategoryService.changeMenuCategoryPosition(
      changeMenuCategoryPositionDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a menu category' })
  deleteMenuCategory(@Param('id') id: string): Promise<StatusResponse> {
    return this.menuCategoryService.deleteMenuCategory(id);
  }
}
