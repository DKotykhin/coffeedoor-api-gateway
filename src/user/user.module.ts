import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { userGrpcConfig } from '../config/grpc.config';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [ClientsModule.registerAsync([userGrpcConfig])],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
