import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import {
  ChangeMenuItemPositionDto,
  CreateMenuItemDto,
  UpdateMenuItemDto,
} from './dto/_index';

@Injectable()
export class MenuItemService {
  constructor(
    @Inject('MENU_SERVICE') private readonly menuService: ClientProxy,
  ) {}

  async findAllByCategoryId(categoryId: string) {
    return this.menuService.send('findMenuItemsByCategoryId', categoryId);
  }

  async findById(id: string) {
    return this.menuService.send('findMenuItemById', id);
  }

  async create(createMenuItemDto: CreateMenuItemDto) {
    return this.menuService.send('createMenuItem', createMenuItemDto);
  }

  async update(id: string, updateMenuItemDto: UpdateMenuItemDto) {
    return this.menuService.send('updateMenuItem', {
      id,
      ...updateMenuItemDto,
    });
  }

  async changePosition(changeMenuItemPositionDto: ChangeMenuItemPositionDto) {
    return this.menuService.send(
      'changeMenuItemPosition',
      changeMenuItemPositionDto,
    );
  }

  async remove(id: string) {
    return this.menuService.send('removeMenuItem', id);
  }
}
