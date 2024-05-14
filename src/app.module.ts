import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';

import { validate } from './utils/env.validator';
import { MenuCategoryModule } from './menu-category/menu-category.module';
import { MenuItemModule } from './menu-item/menu-item.module';
import { HealthCheckModule } from './health-check/health-check.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { StoreCategoryModule } from './store-category/store-category.module';
import { StoreItemModule } from './store-item/store-item.module';
import { OrderItemModule } from './order-item/order-item.module';
import { OrderModule } from './order/order.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { StoreItemImageModule } from './store-item-image/store-item-image.module';

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
    AuthModule,
    HealthCheckModule,
    MenuCategoryModule,
    MenuItemModule,
    OrderItemModule,
    OrderModule,
    StoreCategoryModule,
    StoreItemModule,
    UserModule,
    FileUploadModule,
    StoreItemImageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
