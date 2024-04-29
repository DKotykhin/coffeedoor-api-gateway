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

import { HasRoles } from '../auth/decorators/roles.decorator';
import { RoleTypes } from '../types/enums';
import { RolesGuard } from '../auth/guards/roles.guard';

import {
  ChangeMenuItemPositionDto,
  CreateMenuItemDto,
  UpdateMenuItemDto,
} from './dto/_index';
import { MenuItemService } from './menu-item.service';
import { MenuItem, MenuItems, StatusResponse } from './menu-item.pb';

@Controller('menu-items')
@HasRoles(RoleTypes.ADMIN, RoleTypes.SUBADMIN)
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class MenuItemController {
  constructor(private readonly menuItemService: MenuItemService) {}

  @Get()
  findAllByCategoryId(
    @Query('categoryId') categoryId: string,
  ): Promise<MenuItems> {
    return this.menuItemService.findAllByCategoryId(categoryId);
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<MenuItem> {
    return this.menuItemService.findById(id);
  }

  @Post()
  create(@Body() createMenuItemDto: CreateMenuItemDto): Promise<MenuItem> {
    return this.menuItemService.create(createMenuItemDto);
  }

  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateMenuItemDto: UpdateMenuItemDto,
  ): Promise<MenuItem> {
    return this.menuItemService.update(id, updateMenuItemDto);
  }

  @Patch('change-position')
  changePosition(
    @Body() changeMenuItemPositionDto: ChangeMenuItemPositionDto,
  ): Promise<MenuItem> {
    return this.menuItemService.changePosition(changeMenuItemPositionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<StatusResponse> {
    return this.menuItemService.remove(id);
  }
}
