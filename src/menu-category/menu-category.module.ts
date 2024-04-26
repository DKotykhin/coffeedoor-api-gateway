import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

import { MenuCategoryService } from './menu-category.service';
import {
  AllMenuController,
  MenuCategoryController,
} from './menu-category.controller';
import { MENU_CATEGORY_PACKAGE_NAME } from './menu-category.pb';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'MENU_CATEGORY_SERVICE',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: MENU_CATEGORY_PACKAGE_NAME,
            protoPath: join(__dirname, '../../proto/menu-category.proto'),
            url: `${configService.get<string>('MENU_SERVICE_HOST')}:${configService.get<string>('MENU_SERVICE_PORT')}`,
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [AllMenuController, MenuCategoryController],
  providers: [MenuCategoryService],
})
export class MenuCategoryModule {}
