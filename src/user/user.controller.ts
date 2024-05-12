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
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common/pipes';

import { EmailDto, PasswordDto } from '../auth/dto/auth.dto';
import { StatusResponse } from '../common/dto/status-response.dto';
import { GetUser } from '../auth/decorators/get-user.decorator';

import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { IdDto } from '../common/dto/id.dto';

@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('get-by-email')
  @ApiOperation({ summary: 'Get user by email' })
  @ApiResponse({ status: 200, type: UserDto })
  getUserByEmail(@Body() emailDto: EmailDto): Promise<UserDto> {
    return this.userService.getUserByEmail(emailDto.email);
  }

  @Get('get-by-id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, type: UserDto })
  getUserById(@Body() idDto: IdDto): Promise<UserDto> {
    return this.userService.getUserById(idDto.id);
  }

  @Patch()
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, type: UserDto })
  updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() user: UserDto,
  ): Promise<UserDto> {
    return this.userService.updateUser(user.id, updateUserDto);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200, type: StatusResponse })
  deleteUser(@GetUser() user: UserDto): Promise<StatusResponse> {
    return this.userService.deleteUser(user.id);
  }

  @Post('password')
  @ApiOperation({ summary: 'Confirm password' })
  @ApiResponse({ status: 200, type: StatusResponse })
  confirmPassword(
    @Body() passwordDto: PasswordDto,
    @GetUser() user: UserDto,
  ): Promise<StatusResponse> {
    return this.userService.confirmPassword(user.id, passwordDto.password);
  }

  @Patch('password')
  @ApiOperation({ summary: 'Change password' })
  @ApiResponse({ status: 200, type: StatusResponse })
  changePassword(
    @Body() passwordDto: PasswordDto,
    @GetUser() user: UserDto,
  ): Promise<StatusResponse> {
    return this.userService.changePassword(user.id, passwordDto.password);
  }

  @Post('avatar')
  @ApiOperation({ summary: 'Upload avatar' })
  @ApiResponse({ status: 200, type: StatusResponse })
  @UseInterceptors(FileInterceptor('avatar'))
  uploadFile(
    @GetUser() user: UserDto,
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
  @ApiOperation({ summary: 'Delete avatar' })
  @ApiResponse({ status: 200, type: StatusResponse })
  deleteAvatar(@GetUser() user: UserDto): Promise<StatusResponse> {
    return this.userService.deleteAvatar(user.id);
  }
}
