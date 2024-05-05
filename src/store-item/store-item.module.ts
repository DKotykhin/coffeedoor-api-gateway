import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { storeItemGrpcConfig } from '../config/grpc.config';

import { StoreItemService } from './store-item.service';
import { StoreItemController } from './store-item.controller';
import { StoreItemWithAdController } from './store-item-with-ad.controller';

@Module({
  imports: [ClientsModule.registerAsync([storeItemGrpcConfig])],
  controllers: [StoreItemController, StoreItemWithAdController],
  providers: [StoreItemService],
})
export class StoreItemModule {}
