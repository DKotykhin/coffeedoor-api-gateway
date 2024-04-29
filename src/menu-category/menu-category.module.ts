import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { menuCategoryGrpcConfig } from '../config/grpc.config';
import { MenuCategoryService } from './menu-category.service';
import {
  AllMenuController,
  MenuCategoryController,
} from './menu-category.controller';

@Module({
  imports: [ClientsModule.registerAsync([menuCategoryGrpcConfig])],
  controllers: [AllMenuController, MenuCategoryController],
  providers: [MenuCategoryService],
})
export class MenuCategoryModule {}
