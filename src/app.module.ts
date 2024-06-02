import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { ScheduleModule } from '@nestjs/schedule';

import { validate } from './utils/env.validator';
import { MenuCategoryModule } from './menu-category/menu-category.module';
import { MenuItemModule } from './menu-item/menu-item.module';
import { HealthCheckModule } from './health-check/health-check.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { StoreCategoryModule } from './store-category/store-category.module';
import { StoreItemModule } from './store-item/store-item.module';
import { StoreItemImageModule } from './store-item-image/store-item-image.module';
import { OrderItemModule } from './order-item/order-item.module';
import { OrderModule } from './order/order.module';
import { FileUploadModule } from './file-upload/file-upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.stage.dev'],
      validate,
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: 10 * 1000,
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    FileUploadModule,
    HealthCheckModule,
    MenuCategoryModule,
    MenuItemModule,
    OrderItemModule,
    OrderModule,
    StoreCategoryModule,
    StoreItemModule,
    StoreItemImageModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
