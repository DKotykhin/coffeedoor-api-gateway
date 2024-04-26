import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

import { StatusResponseDto } from '../types/_index';
import {
  ChangeMenuItemPositionDto,
  CreateMenuItemDto,
  UpdateMenuItemDto,
} from './dto/_index';
import {
  CreateMenuItemRequest,
  MenuItem,
  MenuItemServiceClient,
  MenuItems,
} from './menu-item.pb';

@Injectable()
export class MenuItemService implements OnModuleInit {
  private menuItemService: MenuItemServiceClient;
  constructor(
    @Inject('MENU_ITEM_SERVICE') private readonly menuServiceClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.menuItemService = this.menuServiceClient.getService('MenuItemService');
  }

  findAllByCategoryId(categoryId: string): Observable<MenuItems> {
    return this.menuItemService.getMenuItemsByCategoryId({ categoryId });
  }

  findById(id: string): Observable<MenuItem> {
    return this.menuItemService.getMenuItemById({ id });
  }

  create(createMenuItemDto: CreateMenuItemDto): Observable<MenuItem> {
    return this.menuItemService.createMenuItem(
      createMenuItemDto as unknown as CreateMenuItemRequest,
    );
  }

  update(
    id: string,
    updateMenuItemDto: UpdateMenuItemDto,
  ): Observable<MenuItem> {
    return this.menuItemService.updateMenuItem({
      id,
      ...updateMenuItemDto,
    });
  }

  changePosition(
    changeMenuItemPositionDto: ChangeMenuItemPositionDto,
  ): Observable<MenuItem> {
    return this.menuItemService.changeMenuItemPosition(
      changeMenuItemPositionDto,
    );
  }

  remove(id: string): Observable<StatusResponseDto> {
    return this.menuItemService.deleteMenuItem({ id });
  }
}
