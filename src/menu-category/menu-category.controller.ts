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

import { RoleTypes } from '../common/types/enums';
import { HasRoles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { StatusResponse } from '../common/dto/status-response.dto';
import { MenuCategoryService } from './menu-category.service';
import {
  ChangeMenuCategoryPositionDto,
  CreateMenuCategoryDto,
  MenuCategoryDto,
  MenuCategoryWithMenuItemsDto,
  UpdateMenuCategoryDto,
} from './dto/_index';

@ApiTags('menu-categories')
@ApiBearerAuth()
@Controller('menu-categories')
@HasRoles(RoleTypes.ADMIN, RoleTypes.SUBADMIN)
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class MenuCategoryController {
  constructor(private readonly menuCategoryService: MenuCategoryService) {}

  @Get()
  @ApiOperation({ summary: 'Get all menu categories' })
  @ApiResponse({ type: MenuCategoryWithMenuItemsDto, isArray: true })
  getMenuCategories(): Promise<MenuCategoryWithMenuItemsDto[]> {
    return this.menuCategoryService.getMenuCategories();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a menu category by id' })
  @ApiResponse({ type: MenuCategoryWithMenuItemsDto })
  getMenuCategoryById(
    @Param('id') id: string,
  ): Promise<MenuCategoryWithMenuItemsDto> {
    return this.menuCategoryService.getMenuCategoryById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new menu category' })
  @ApiResponse({ type: MenuCategoryDto })
  createMenuCategory(
    @Body() createMenuCategoryDto: CreateMenuCategoryDto,
  ): Promise<MenuCategoryDto> {
    return this.menuCategoryService.createMenuCategory(createMenuCategoryDto);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update a menu category' })
  @ApiResponse({ type: MenuCategoryDto })
  updateMenuCategory(
    @Param('id') id: string,
    @Body() updateMenuCategoryDto: UpdateMenuCategoryDto,
  ): Promise<MenuCategoryDto> {
    return this.menuCategoryService.updateMenuCategory(
      id,
      updateMenuCategoryDto,
    );
  }

  @Patch('change-position')
  @ApiOperation({ summary: 'Change menu category position' })
  @ApiResponse({ type: MenuCategoryDto })
  changeMenuCategoryPosition(
    @Body() changeMenuCategoryPositionDto: ChangeMenuCategoryPositionDto,
  ): Promise<MenuCategoryDto> {
    return this.menuCategoryService.changeMenuCategoryPosition(
      changeMenuCategoryPositionDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a menu category' })
  @ApiResponse({ type: StatusResponse })
  deleteMenuCategory(@Param('id') id: string): Promise<StatusResponse> {
    return this.menuCategoryService.deleteMenuCategory(id);
  }
}
