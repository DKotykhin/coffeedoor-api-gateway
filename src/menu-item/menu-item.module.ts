import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { menuItemGrpcConfig } from '../config/grpc.config';
import { MenuItemService } from './menu-item.service';
import { MenuItemController } from './menu-item.controller';

@Module({
  imports: [ClientsModule.registerAsync([menuItemGrpcConfig])],
  controllers: [MenuItemController],
  providers: [MenuItemService],
})
export class MenuItemModule {}
