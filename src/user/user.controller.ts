import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common/pipes';

import { EmailDto, PasswordDto } from '../auth/dto/auth.dto';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { UserService } from './user.service';
import { StatusResponse, User } from './user.pb';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('get-by-email')
  getUserByEmail(@Body() emailDto: EmailDto): Promise<User> {
    return this.userService.getUserByEmail(emailDto.email);
  }

  @Get('get-by-id')
  getUserById(@Body('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Patch()
  updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() user: User,
  ): Promise<User> {
    return this.userService.updateUser(user.id, updateUserDto);
  }

  @Delete()
  deleteUser(@GetUser() user: User): Promise<StatusResponse> {
    return this.userService.deleteUser(user.id);
  }

  @Post('password')
  confirmPassword(
    @Body() passwordDto: PasswordDto,
    @GetUser() user: User,
  ): Promise<StatusResponse> {
    return this.userService.confirmPassword(user.id, passwordDto.password);
  }

  @Patch('password')
  changePassword(
    @Body() passwordDto: PasswordDto,
    @GetUser() user: User,
  ): Promise<StatusResponse> {
    return this.userService.changePassword(user.id, passwordDto.password);
  }

  @Post('avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  uploadFile(
    @GetUser() user: User,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: 'image/jpeg' || 'image/png' || 'image/webp',
          }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 3 }),
        ],
      }),
    )
    avatar: Express.Multer.File,
  ): Promise<StatusResponse> {
    return this.userService.uploadAvatar(user.id, avatar);
  }

  @Delete('avatar')
  deleteAvatar(@GetUser() user: User): Promise<StatusResponse> {
    return this.userService.deleteAvatar(user.id);
  }
}
