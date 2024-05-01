import {
  HttpException,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { LanguageCode } from '../types/enums';
import { errorCodeImplementation } from '../utils/error-code-implementation';
import {
  CreateStoreCategoryRequest,
  STORE_CATEGORY_SERVICE_NAME,
  StatusResponse,
  StoreCategory,
  StoreCategoryList,
  StoreCategoryServiceClient,
} from './store-category.pb';
import { UpdateMenuCategoryRequest } from '../menu-category/menu-category.pb';

@Injectable()
export class StoreCategoryService implements OnModuleInit {
  private storeCategoryService: StoreCategoryServiceClient;
  protected readonly logger = new Logger(StoreCategoryService.name);
  constructor(
    @Inject('STORE_CATEGORY_SERVICE')
    private readonly storeCategoryServiceClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.storeCategoryService = this.storeCategoryServiceClient.getService(
      STORE_CATEGORY_SERVICE_NAME,
    );
  }

  async findByLanguage(language: LanguageCode): Promise<StoreCategoryList> {
    try {
      return await firstValueFrom(
        this.storeCategoryService.getStoreCategoriesByLanguage({
          language,
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

  async findAll(): Promise<StoreCategoryList> {
    try {
      return await firstValueFrom(
        this.storeCategoryService.getAllStoreCategories({}),
      );
    } catch (error) {
      this.logger.error(error?.details);
      throw new HttpException(
        error?.details,
        errorCodeImplementation(error?.code),
      );
    }
  }

  async findById(id: string): Promise<StoreCategory> {
    try {
      return await firstValueFrom(
        this.storeCategoryService.getStoreCategoryById({ id }),
      );
    } catch (error) {
      this.logger.error(error?.details);
      throw new HttpException(
        error?.details,
        errorCodeImplementation(error?.code),
      );
    }
  }

  async create(
    storeCategory: CreateStoreCategoryRequest,
  ): Promise<StoreCategory> {
    try {
      return await firstValueFrom(
        this.storeCategoryService.createStoreCategory(storeCategory),
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
    storeCategory: UpdateMenuCategoryRequest,
  ): Promise<StoreCategory> {
    try {
      return await firstValueFrom(
        this.storeCategoryService.updateStoreCategory(storeCategory),
      );
    } catch (error) {
      this.logger.error(error?.details);
      throw new HttpException(
        error?.details,
        errorCodeImplementation(error?.code),
      );
    }
  }

  async delete(id: string): Promise<StatusResponse> {
    try {
      return await firstValueFrom(
        this.storeCategoryService.deleteStoreCategory({ id }),
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