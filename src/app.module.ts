import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { validate } from './utils/env.validator';
import { MenuCategoryModule } from './menu-category/menu-category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.stage.dev'],
      validate,
    }),
    MenuCategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
