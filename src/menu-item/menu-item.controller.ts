import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Delete,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { MenuItem, StatusResponseDto } from '../types/_index';
import {
  ChangeMenuItemPositionDto,
  CreateMenuItemDto,
  UpdateMenuItemDto,
} from './dto/_index';
import { MenuItemService } from './menu-item.service';

@Controller('menu-items')
export class MenuItemController {
  constructor(private readonly menuItemService: MenuItemService) {}

  @Get()
  findAllByCategoryId(
    @Query('categoryId') categoryId: string,
  ): Promise<Observable<MenuItem[]>> {
    return this.menuItemService.findAllByCategoryId(categoryId);
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<Observable<MenuItem>> {
    return this.menuItemService.findById(id);
  }

  @Post()
  create(
    @Body() createMenuItemDto: CreateMenuItemDto,
  ): Promise<Observable<MenuItem>> {
    return this.menuItemService.create(createMenuItemDto);
  }

  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateMenuItemDto: UpdateMenuItemDto,
  ): Promise<Observable<MenuItem>> {
    return this.menuItemService.update(id, updateMenuItemDto);
  }

  @Patch('change-position')
  changePosition(
    @Body() changeMenuItemPositionDto: ChangeMenuItemPositionDto,
  ): Promise<Observable<MenuItem>> {
    return this.menuItemService.changePosition(changeMenuItemPositionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Observable<StatusResponseDto>> {
    return this.menuItemService.remove(id);
  }
}
