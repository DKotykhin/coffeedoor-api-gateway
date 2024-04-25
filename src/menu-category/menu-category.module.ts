import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

import { MenuCategoryService } from './menu-category.service';
import {
  AllMenuController,
  MenuCategoryController,
} from './menu-category.controller';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'MENU_SERVICE',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('MENU_SERVICE_HOST'),
            port: configService.get<number>('MENU_SERVICE_PORT'),
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
