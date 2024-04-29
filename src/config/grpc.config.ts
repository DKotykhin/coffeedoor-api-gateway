import { ClientsProviderAsyncOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

import { MENU_CATEGORY_PACKAGE_NAME } from '../menu-category/menu-category.pb';
import { MENU_ITEM_PACKAGE_NAME } from '../menu-item/menu-item.pb';
import { HEALTH_CHECK_PACKAGE_NAME } from '../health-check/health-check.pb';
import { AUTH_PACKAGE_NAME } from '../auth/auth.pb';
import { USER_PACKAGE_NAME } from '../user/user.pb';

export const menuCategoryGrpcConfig: ClientsProviderAsyncOptions = {
  name: 'MENU_CATEGORY_SERVICE',
  useFactory: (configService: ConfigService) => ({
    transport: Transport.GRPC,
    options: {
      package: MENU_CATEGORY_PACKAGE_NAME,
      protoPath: join(__dirname, '../../proto/menu/menu-category.proto'),
      url: `${configService.get<string>('MENU_SERVICE_HOST')}:${configService.get<string>('MENU_SERVICE_PORT')}`,
    },
  }),
  inject: [ConfigService],
};

export const menuItemGrpcConfig: ClientsProviderAsyncOptions = {
  name: 'MENU_ITEM_SERVICE',
  useFactory: (configService: ConfigService) => ({
    transport: Transport.GRPC,
    options: {
      package: MENU_ITEM_PACKAGE_NAME,
      protoPath: join(__dirname, '../../proto/menu/menu-item.proto'),
      url: `${configService.get<string>('MENU_SERVICE_HOST')}:${configService.get<string>('MENU_SERVICE_PORT')}`,
    },
  }),
  inject: [ConfigService],
};

export const menuHealthCheckGrpcConfig: ClientsProviderAsyncOptions = {
  name: 'MENU_HEALTH_CHECK_SERVICE',
  useFactory: (configService: ConfigService) => ({
    transport: Transport.GRPC,
    options: {
      package: HEALTH_CHECK_PACKAGE_NAME,
      protoPath: join(__dirname, '../../proto/health-check.proto'),
      url: `${configService.get<string>('MENU_SERVICE_HOST')}:${configService.get<string>('MENU_SERVICE_PORT')}`,
    },
  }),
  inject: [ConfigService],
};

export const userHealthCheckGrpcConfig: ClientsProviderAsyncOptions = {
  name: 'USER_HEALTH_CHECK_SERVICE',
  useFactory: (configService: ConfigService) => ({
    transport: Transport.GRPC,
    options: {
      package: HEALTH_CHECK_PACKAGE_NAME,
      protoPath: join(__dirname, '../../proto/health-check.proto'),
      url: `${configService.get<string>('USER_SERVICE_HOST')}:${configService.get<string>('USER_SERVICE_PORT')}`,
    },
  }),
  inject: [ConfigService],
};

export const authGrpcConfig: ClientsProviderAsyncOptions = {
  name: 'AUTH_SERVICE',
  useFactory: (configService: ConfigService) => ({
    transport: Transport.GRPC,
    options: {
      package: AUTH_PACKAGE_NAME,
      protoPath: join(__dirname, '../../proto/user/auth.proto'),
      url: `${configService.get<string>('USER_SERVICE_HOST')}:${configService.get<string>('USER_SERVICE_PORT')}`,
    },
  }),
  inject: [ConfigService],
};

export const userGrpcConfig: ClientsProviderAsyncOptions = {
  name: 'USER_SERVICE',
  useFactory: (configService: ConfigService) => ({
    transport: Transport.GRPC,
    options: {
      package: USER_PACKAGE_NAME,
      protoPath: join(__dirname, '../../proto/user/user.proto'),
      url: `${configService.get<string>('USER_SERVICE_HOST')}:${configService.get<string>('USER_SERVICE_PORT')}`,
    },
  }),
  inject: [ConfigService],
};
