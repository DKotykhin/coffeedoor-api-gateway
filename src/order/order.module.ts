import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { orderGrpcConfig } from '../config/grpc.config';

@Module({
  imports: [ClientsModule.registerAsync([orderGrpcConfig])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
