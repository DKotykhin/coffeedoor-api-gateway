import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { FileUploadService } from '../file-upload/file-upload.service';
import { storeItemImageGrpcConfig } from '../config/grpc.config';

import { StoreItemImageService } from './store-item-image.service';
import { StoreItemImageController } from './store-item-image.controller';

@Module({
  imports: [ClientsModule.registerAsync([storeItemImageGrpcConfig])],
  controllers: [StoreItemImageController],
  providers: [StoreItemImageService, FileUploadService],
})
export class StoreItemImageModule {}
