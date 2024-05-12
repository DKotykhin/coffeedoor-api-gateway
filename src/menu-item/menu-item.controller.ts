import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { HasRoles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { RoleTypes } from '../common/types/enums';
import { StatusResponse } from '../common/dto/status-response.dto';

import {
  ChangeMenuItemPositionDto,
  CreateMenuItemDto,
  MenuItemDto,
  UpdateMenuItemDto,
} from './dto/_index';
import { MenuItemService } from './menu-item.service';

@ApiTags('menu-items')
@ApiBearerAuth()
@Controller('menu-items')
@HasRoles(RoleTypes.ADMIN, RoleTypes.SUBADMIN)
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class MenuItemController {
  constructor(private readonly menuItemService: MenuItemService) {}

  @Get()
  @ApiOperation({ summary: 'Get menu items by category id' })
  @ApiResponse({ type: MenuItemDto, isArray: true })
  findMenuItemsByCategoryId(
    @Query('categoryId') categoryId: string,
  ): Promise<MenuItemDto[]> {
    return this.menuItemService.findMenuItemsByCategoryId(categoryId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get menu item by id' })
  @ApiResponse({ type: MenuItemDto })
  findMenuItemById(@Param('id') id: string): Promise<MenuItemDto> {
    return this.menuItemService.findMenuItemById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create menu item' })
  @ApiResponse({ type: MenuItemDto })
  createMenuItem(
    @Body() createMenuItemDto: CreateMenuItemDto,
  ): Promise<MenuItemDto> {
    return this.menuItemService.createMenuItem(createMenuItemDto);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Update menu item' })
  @ApiResponse({ type: MenuItemDto })
  updateMenuItem(
    @Param('id') id: string,
    @Body() updateMenuItemDto: UpdateMenuItemDto,
  ): Promise<MenuItemDto> {
    return this.menuItemService.updateMenuItem(id, updateMenuItemDto);
  }

  @Patch('change-position')
  @ApiOperation({ summary: 'Change menu item position' })
  @ApiResponse({ type: MenuItemDto })
  changeMenuItemPosition(
    @Body() changeMenuItemPositionDto: ChangeMenuItemPositionDto,
  ): Promise<MenuItemDto> {
    return this.menuItemService.changeMenuItemPosition(
      changeMenuItemPositionDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete menu item' })
  @ApiResponse({ type: StatusResponse })
  deleteMenuItem(@Param('id') id: string): Promise<StatusResponse> {
    return this.menuItemService.deleteMenuItem(id);
  }
}
