import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { storeCategoryGrpcConfig } from '../config/grpc.config';
import { FileUploadService } from '../file-upload/file-upload.service';

import { StoreCategoryService } from './store-category.service';
import {
  StoreCategoryController,
  StoreController,
} from './store-category.controller';

@Module({
  imports: [ClientsModule.registerAsync([storeCategoryGrpcConfig])],
  controllers: [StoreCategoryController, StoreController],
  providers: [StoreCategoryService, FileUploadService],
})
export class StoreCategoryModule {}
