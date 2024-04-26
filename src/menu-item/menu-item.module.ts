import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

import { MenuItemService } from './menu-item.service';
import { MenuItemController } from './menu-item.controller';
import { MENU_ITEM_PACKAGE_NAME } from './menu-item.pb';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'MENU_ITEM_SERVICE',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: MENU_ITEM_PACKAGE_NAME,
            protoPath: join(__dirname, '../../proto/menu-item.proto'),
            url: `${configService.get<string>('MENU_SERVICE_HOST')}:${configService.get<string>('MENU_SERVICE_PORT')}`,
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [MenuItemController],
  providers: [MenuItemService],
})
export class MenuItemModule {}
