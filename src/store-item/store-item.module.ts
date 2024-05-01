import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { storeItemGrpcConfig } from '../config/grpc.config';
import { StoreItemService } from './store-item.service';
import {
  StoreItemController,
  StoreItemWithRecommendationsController,
} from './store-item.controller';

@Module({
  imports: [ClientsModule.registerAsync([storeItemGrpcConfig])],
  controllers: [StoreItemController, StoreItemWithRecommendationsController],
  providers: [StoreItemService],
})
export class StoreItemModule {}
