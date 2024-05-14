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
import { FileUploadService } from '../file-upload/file-upload.service';
import {
  CreateStoreItemRequest,
  STORE_ITEM_SERVICE_NAME,
  StatusResponse,
  StoreItem,
  StoreItemImage,
  StoreItemServiceClient,
  StoreItemWithAd,
  StoreItemWithImages,
  UpdateStoreItemRequest,
} from './store-item.pb';

@Injectable()
export class StoreItemService implements OnModuleInit {
  private storeItemService: StoreItemServiceClient;
  protected readonly logger = new Logger(StoreItemService.name);
  constructor(
    @Inject('STORE_ITEM_SERVICE')
    private readonly storeItemServiceClient: ClientGrpc,
    private readonly fileUploadService: FileUploadService,
  ) {}

  onModuleInit() {
    this.storeItemService = this.storeItemServiceClient.getService(
      STORE_ITEM_SERVICE_NAME,
    );
  }

  async getStoreItemBySlugWithAd(slug: string): Promise<StoreItemWithAd> {
    try {
      const { storeItem, adList } = await firstValueFrom(
        this.storeItemService.getStoreItemBySlugWithAd({ slug }),
      );
      if (storeItem.images?.length) {
        storeItem.imageUrl = await Promise.all(
          storeItem.images.map(async (image: StoreItemImage) => {
            const imageUrl = await this.fileUploadService.getImageUrl(
              image.image,
            );
            if (imageUrl) return imageUrl;
          }),
        );
      }
      if (adList.length) {
        await Promise.all(
          adList.map(async (storeItem: StoreItemWithImages) => {
            if (storeItem.images?.length) {
              storeItem.imageUrl = await Promise.all(
                storeItem.images.map(async (image: StoreItemImage) => {
                  const imageUrl = await this.fileUploadService.getImageUrl(
                    image.image,
                  );
                  if (imageUrl) return imageUrl;
                }),
              );
            }
          }),
        );
      }
      return { storeItem, adList };
    } catch (error) {
      const code = errorCodeImplementation(error.code);
      const message = error.details;
      this.logger.error(`Error code: ${code} - ${message}`);
      throw new HttpException(message, code);
    }
  }

  async findStoreItemsByCategoryId(id: string): Promise<StoreItemWithImages[]> {
    try {
      const { storeItemList } = await firstValueFrom(
        this.storeItemService.getStoreItemsByCategoryId({ id }),
      );
      if (!storeItemList) throw new HttpException('Store items not found', 5);
      await Promise.all(
        storeItemList.map(async (storeItem: StoreItemWithImages) => {
          if (storeItem.images?.length) {
            storeItem.imageUrl = await Promise.all(
              storeItem.images.map(async (image: StoreItemImage) => {
                const imageUrl = await this.fileUploadService.getImageUrl(
                  image.image,
                );
                if (imageUrl) return imageUrl;
              }),
            );
            return storeItem;
          }
        }),
      );
      return storeItemList;
    } catch (error) {
      this.logger.error(error.details || error.message);
      throw new HttpException(
        error.details || error.message,
        errorCodeImplementation(error.code || error.status),
      );
    }
  }

  async getStoreItemBySlug(slug: string): Promise<StoreItemWithImages> {
    try {
      const storeItem = await firstValueFrom(
        this.storeItemService.getStoreItemBySlug({ slug }),
      );
      if (storeItem.images?.length) {
        storeItem.imageUrl = await Promise.all(
          storeItem.images.map(async (image: StoreItemImage) => {
            const imageUrl = await this.fileUploadService.getImageUrl(
              image.image,
            );
            if (imageUrl) return imageUrl;
          }),
        );
      }
      return storeItem;
    } catch (error) {
      const code = errorCodeImplementation(error.code);
      const message = error.details;
      this.logger.error(`Error code: ${code} - ${message}`);
      throw new HttpException(message, code);
    }
  }

  async createStoreItem(storeItem: CreateStoreItemRequest): Promise<StoreItem> {
    try {
      return await firstValueFrom(
        this.storeItemService.createStoreItem(storeItem),
      );
    } catch (error) {
      const code = errorCodeImplementation(error.code);
      const message = error.details;
      this.logger.error(`Error code: ${code} - ${message}`);
      throw new HttpException(message, code);
    }
  }

  async updateStoreItem(storeItem: UpdateStoreItemRequest): Promise<StoreItem> {
    try {
      return await firstValueFrom(
        this.storeItemService.updateStoreItem(storeItem),
      );
    } catch (error) {
      const code = errorCodeImplementation(error.code);
      const message = error.details;
      this.logger.error(`Error code: ${code} - ${message}`);
      throw new HttpException(message, code);
    }
  }

  async deleteStoreItem(slug: string): Promise<StatusResponse> {
    try {
      return await firstValueFrom(
        this.storeItemService.deleteStoreItem({ slug }),
      );
    } catch (error) {
      const code = errorCodeImplementation(error.code);
      const message = error.details;
      this.logger.error(`Error code: ${code} - ${message}`);
      throw new HttpException(message, code);
    }
  }
}
