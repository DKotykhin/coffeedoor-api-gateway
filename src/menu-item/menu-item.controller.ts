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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { HasRoles } from '../auth/decorators/roles.decorator';
import { RoleTypes } from '../types/enums';
import { RolesGuard } from '../auth/guards/roles.guard';

import {
  ChangeMenuItemPositionDto,
  CreateMenuItemDto,
  UpdateMenuItemDto,
} from './dto/_index';
import { MenuItemService } from './menu-item.service';
import { MenuItem, StatusResponse } from './menu-item.pb';

@ApiTags('menu-items')
@ApiBearerAuth()
@Controller('menu-items')
@HasRoles(RoleTypes.ADMIN, RoleTypes.SUBADMIN)
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class MenuItemController {
  constructor(private readonly menuItemService: MenuItemService) {}

  @Get()
  findMenuItemsByCategoryId(
    @Query('categoryId') categoryId: string,
  ): Promise<MenuItem[]> {
    return this.menuItemService.findMenuItemsByCategoryId(categoryId);
  }

  @Get(':id')
  findMenuItemById(@Param('id') id: string): Promise<MenuItem> {
    return this.menuItemService.findMenuItemById(id);
  }

  @Post()
  createMenuItem(
    @Body() createMenuItemDto: CreateMenuItemDto,
  ): Promise<MenuItem> {
    return this.menuItemService.createMenuItem(createMenuItemDto);
  }

  @Patch('update/:id')
  updateMenuItem(
    @Param('id') id: string,
    @Body() updateMenuItemDto: UpdateMenuItemDto,
  ): Promise<MenuItem> {
    return this.menuItemService.updateMenuItem(id, updateMenuItemDto);
  }

  @Patch('change-position')
  changeMenuItemPosition(
    @Body() changeMenuItemPositionDto: ChangeMenuItemPositionDto,
  ): Promise<MenuItem> {
    return this.menuItemService.changeMenuItemPosition(
      changeMenuItemPositionDto,
    );
  }

  @Delete(':id')
  deleteMenuItem(@Param('id') id: string): Promise<StatusResponse> {
    return this.menuItemService.deleteMenuItem(id);
  }
}
