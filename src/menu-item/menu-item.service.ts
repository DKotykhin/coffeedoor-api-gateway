import {
  HttpException,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { errorCodeImplementation } from '../utils/error-code-implementation';
import { ChangeMenuItemPositionDto, UpdateMenuItemDto } from './dto/_index';
import {
  CreateMenuItemRequest,
  MENU_ITEM_SERVICE_NAME,
  MenuItem,
  MenuItemServiceClient,
  StatusResponse,
} from './menu-item.pb';

@Injectable()
export class MenuItemService implements OnModuleInit {
  private menuItemService: MenuItemServiceClient;
  protected readonly logger = new Logger(MenuItemService.name);
  constructor(
    @Inject('MENU_ITEM_SERVICE') private readonly menuServiceClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.menuItemService = this.menuServiceClient.getService(
      MENU_ITEM_SERVICE_NAME,
    );
  }

  async findMenuItemsByCategoryId(id: string): Promise<MenuItem[]> {
    try {
      const { menuItemList } = await firstValueFrom(
        this.menuItemService.getMenuItemsByCategoryId({ id }),
      );
      return menuItemList;
    } catch (error) {
      const code = errorCodeImplementation(error.code);
      const message = error.details;
      this.logger.error(`Error code: ${code} - ${message}`);
      throw new HttpException(message, code);
    }
  }

  async findMenuItemById(id: string): Promise<MenuItem> {
    try {
      return await firstValueFrom(this.menuItemService.getMenuItemById({ id }));
    } catch (error) {
      const code = errorCodeImplementation(error.code);
      const message = error.details;
      this.logger.error(`Error code: ${code} - ${message}`);
      throw new HttpException(message, code);
    }
  }

  async createMenuItem(
    createMenuItemDto: CreateMenuItemRequest,
  ): Promise<MenuItem> {
    try {
      return await firstValueFrom(
        this.menuItemService.createMenuItem(createMenuItemDto),
      );
    } catch (error) {
      const code = errorCodeImplementation(error.code);
      const message = error.details;
      this.logger.error(`Error code: ${code} - ${message}`);
      throw new HttpException(message, code);
    }
  }

  async updateMenuItem(
    id: string,
    updateMenuItemDto: UpdateMenuItemDto,
  ): Promise<MenuItem> {
    try {
      return await firstValueFrom(
        this.menuItemService.updateMenuItem({
          id,
          ...updateMenuItemDto,
        }),
      );
    } catch (error) {
      const code = errorCodeImplementation(error.code);
      const message = error.details;
      this.logger.error(`Error code: ${code} - ${message}`);
      throw new HttpException(message, code);
    }
  }

  async changeMenuItemPosition(
    changeMenuItemPositionDto: ChangeMenuItemPositionDto,
  ): Promise<MenuItem> {
    try {
      return await firstValueFrom(
        this.menuItemService.changeMenuItemPosition(changeMenuItemPositionDto),
      );
    } catch (error) {
      const code = errorCodeImplementation(error.code);
      const message = error.details;
      this.logger.error(`Error code: ${code} - ${message}`);
      throw new HttpException(message, code);
    }
  }

  async deleteMenuItem(id: string): Promise<StatusResponse> {
    try {
      return await firstValueFrom(this.menuItemService.deleteMenuItem({ id }));
    } catch (error) {
      const code = errorCodeImplementation(error.code);
      const message = error.details;
      this.logger.error(`Error code: ${code} - ${message}`);
      throw new HttpException(message, code);
    }
  }
}
