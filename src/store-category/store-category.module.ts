import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { storeCategoryGrpcConfig } from '../config/grpc.config';
import { FileUploadService } from '../file-upload/file-upload.service';

import { StoreCategoryService } from './store-category.service';
import { StoreCategoryController } from './store-category.controller';
import { AllStoreController } from './all-store.controller';

@Module({
  imports: [ClientsModule.registerAsync([storeCategoryGrpcConfig])],
  controllers: [StoreCategoryController, AllStoreController],
  providers: [StoreCategoryService, FileUploadService],
})
export class StoreCategoryModule {}
