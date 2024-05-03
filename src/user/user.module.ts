import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { FileUploadService } from '../file-upload/file-upload.service';
import { userGrpcConfig } from '../config/grpc.config';

import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [ClientsModule.registerAsync([userGrpcConfig])],
  controllers: [UserController],
  providers: [UserService, FileUploadService],
  exports: [UserService],
})
export class UserModule {}
