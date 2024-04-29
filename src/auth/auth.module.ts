import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { authGrpcConfig } from '../config/grpc.config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [ClientsModule.registerAsync([authGrpcConfig])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
