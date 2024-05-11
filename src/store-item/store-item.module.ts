import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { storeItemGrpcConfig } from '../config/grpc.config';
import { FileUploadService } from '../file-upload/file-upload.service';

import { StoreItemService } from './store-item.service';
import { StoreItemController } from './store-item.controller';
import { StoreItemWithAdController } from './store-item-with-ad.controller';

@Module({
  imports: [ClientsModule.registerAsync([storeItemGrpcConfig])],
  controllers: [StoreItemController, StoreItemWithAdController],
  providers: [FileUploadService, StoreItemService],
})
export class StoreItemModule {}
