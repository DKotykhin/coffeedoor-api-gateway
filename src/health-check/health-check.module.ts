import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import {
  menuHealthCheckGrpcConfig,
  orderHealthCheckGrpcConfig,
  storeHealthCheckGrpcConfig,
  userHealthCheckGrpcConfig,
} from '../config/grpc.config';
import { HealthCheckService } from './health-check.service';
import { HealthCheckController } from './health-check.controller';

@Module({
  imports: [
    ClientsModule.registerAsync([
      menuHealthCheckGrpcConfig,
      userHealthCheckGrpcConfig,
      storeHealthCheckGrpcConfig,
      orderHealthCheckGrpcConfig,
    ]),
  ],
  controllers: [HealthCheckController],
  providers: [HealthCheckService],
})
export class HealthCheckModule {}
