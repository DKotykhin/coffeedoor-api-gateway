import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { storeCategoryGrpcConfig } from '../config/grpc.config';
import { StoreCategoryService } from './store-category.service';
import {
  StoreCategoryController,
  StoreController,
} from './store-category.controller';

@Module({
  imports: [ClientsModule.registerAsync([storeCategoryGrpcConfig])],
  controllers: [StoreCategoryController, StoreController],
  providers: [StoreCategoryService],
})
export class StoreCategoryModule {}
