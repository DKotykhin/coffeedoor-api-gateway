import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { OrderItemService } from './order-item.service';
import { OrderItemController } from './order-item.controller';
import { orderItemGrpcConfig } from '../config/grpc.config';

@Module({
  imports: [ClientsModule.registerAsync([orderItemGrpcConfig])],
  controllers: [OrderItemController],
  providers: [OrderItemService],
})
export class OrderItemModule {}
