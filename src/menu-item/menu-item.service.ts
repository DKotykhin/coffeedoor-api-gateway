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
import {
  ChangeMenuItemPositionDto,
  CreateMenuItemDto,
  UpdateMenuItemDto,
} from './dto/_index';
import {
  CreateMenuItemRequest,
  MENU_ITEM_SERVICE_NAME,
  MenuItem,
  MenuItemServiceClient,
  MenuItems,
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

  async findAllByCategoryId(categoryId: string): Promise<MenuItems> {
    try {
      return await firstValueFrom(
        this.menuItemService.getMenuItemsByCategoryId({ categoryId }),
      );
    } catch (error) {
      this.logger.error(error?.details);
      throw new HttpException(
        error?.details,
        errorCodeImplementation(error?.code),
      );
    }
  }

  async findById(id: string): Promise<MenuItem> {
    try {
      return await firstValueFrom(this.menuItemService.getMenuItemById({ id }));
    } catch (error) {
      this.logger.error(error?.details);
      throw new HttpException(
        error?.details,
        errorCodeImplementation(error?.code),
      );
    }
  }

  async create(createMenuItemDto: CreateMenuItemDto): Promise<MenuItem> {
    try {
      return await firstValueFrom(
        this.menuItemService.createMenuItem(
          createMenuItemDto as unknown as CreateMenuItemRequest,
        ),
      );
    } catch (error) {
      this.logger.error(error?.details);
      throw new HttpException(
        error?.details,
        errorCodeImplementation(error?.code),
      );
    }
  }

  async update(
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
      this.logger.error(error?.details);
      throw new HttpException(
        error?.details,
        errorCodeImplementation(error?.code),
      );
    }
  }

  async changePosition(
    changeMenuItemPositionDto: ChangeMenuItemPositionDto,
  ): Promise<MenuItem> {
    try {
      return await firstValueFrom(
        this.menuItemService.changeMenuItemPosition(changeMenuItemPositionDto),
      );
    } catch (error) {
      this.logger.error(error?.details);
      throw new HttpException(
        error?.details,
        errorCodeImplementation(error?.code),
      );
    }
  }

  async remove(id: string): Promise<StatusResponse> {
    try {
      return await firstValueFrom(this.menuItemService.deleteMenuItem({ id }));
    } catch (error) {
      this.logger.error(error?.details);
      throw new HttpException(
        error?.details,
        errorCodeImplementation(error?.code),
      );
    }
  }
}
