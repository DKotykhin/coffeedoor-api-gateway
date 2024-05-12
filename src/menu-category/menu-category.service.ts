import {
  HttpException,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { LanguageCode } from '../common/types/enums';
import { errorCodeImplementation } from '../utils/error-code-implementation';
import {
  ChangeMenuCategoryPositionDto,
  CreateMenuCategoryDto,
  UpdateMenuCategoryDto,
} from './dto/_index';
import {
  MENU_CATEGORY_SERVICE_NAME,
  MenuCategory,
  MenuCategoryServiceClient,
  MenuCategoryWithMenuItems,
  StatusResponse,
} from './menu-category.pb';

@Injectable()
export class MenuCategoryService implements OnModuleInit {
  private menuCategoryService: MenuCategoryServiceClient;
  protected readonly logger = new Logger(MenuCategoryService.name);
  constructor(
    @Inject('MENU_CATEGORY_SERVICE')
    private readonly menuServiceClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.menuCategoryService = this.menuServiceClient.getService(
      MENU_CATEGORY_SERVICE_NAME,
    );
  }

  async getMenuByLanguage(
    language: LanguageCode,
  ): Promise<MenuCategoryWithMenuItems[]> {
    try {
      const { menuCategoryList } = await firstValueFrom(
        this.menuCategoryService.getMenuCategoriesByLanguage({
          language,
        }),
      );
      return menuCategoryList;
    } catch (error) {
      this.logger.error(error?.details);
      throw new HttpException(
        error?.details,
        errorCodeImplementation(error?.code),
      );
    }
  }

  async getMenuCategories(): Promise<MenuCategoryWithMenuItems[]> {
    try {
      const { menuCategoryList } = await firstValueFrom(
        this.menuCategoryService.getAllMenuCategories({}),
      );
      return menuCategoryList;
    } catch (error) {
      this.logger.error(error?.details);
      throw new HttpException(
        error?.details,
        errorCodeImplementation(error?.code),
      );
    }
  }

  async getMenuCategoryById(id: string): Promise<MenuCategoryWithMenuItems> {
    try {
      return await firstValueFrom(
        this.menuCategoryService.getMenuCategoryById({ id }),
      );
    } catch (error) {
      this.logger.error(error?.details);
      throw new HttpException(
        error?.details,
        errorCodeImplementation(error?.code),
      );
    }
  }

  async createMenuCategory(
    createMenuCategoryDto: CreateMenuCategoryDto,
  ): Promise<MenuCategory> {
    try {
      return await firstValueFrom(
        this.menuCategoryService.createMenuCategory(createMenuCategoryDto),
      );
    } catch (error) {
      this.logger.error(error?.details);
      throw new HttpException(
        error?.details,
        errorCodeImplementation(error?.code),
      );
    }
  }

  async updateMenuCategory(
    id: string,
    updateMenuCategoryDto: UpdateMenuCategoryDto,
  ): Promise<MenuCategory> {
    try {
      return await firstValueFrom(
        this.menuCategoryService.updateMenuCategory({
          id,
          ...updateMenuCategoryDto,
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

  async changeMenuCategoryPosition(
    changeMenuCategoryPositionDto: ChangeMenuCategoryPositionDto,
  ): Promise<MenuCategory> {
    try {
      return await firstValueFrom(
        this.menuCategoryService.changeMenuCategoryPosition(
          changeMenuCategoryPositionDto,
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

  async deleteMenuCategory(id: string): Promise<StatusResponse> {
    try {
      return await firstValueFrom(
        this.menuCategoryService.deleteMenuCategory({ id }),
      );
    } catch (error) {
      this.logger.error(error?.details);
      throw new HttpException(
        error?.details,
        errorCodeImplementation(error?.code),
      );
    }
  }
}
