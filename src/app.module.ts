import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { validate } from './utils/env.validator';
import { MenuCategoryModule } from './menu-category/menu-category.module';
import { MenuItemModule } from './menu-item/menu-item.module';
import { HealthCheckModule } from './health-check/health-check.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { StoreCategoryModule } from './store-category/store-category.module';
import { StoreItemModule } from './store-item/store-item.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.stage.dev'],
      validate,
    }),
    MenuCategoryModule,
    MenuItemModule,
    HealthCheckModule,
    UserModule,
    AuthModule,
    StoreCategoryModule,
    StoreItemModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
