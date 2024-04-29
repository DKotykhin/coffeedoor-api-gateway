import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';

import { EmailDto, PasswordDto } from '../auth/dto/auth.dto';
import { UserService } from './user.service';
import { StatusResponse, User } from './user.pb';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
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
    @Body('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete()
  deleteUser(@Body('id') id: string): Promise<StatusResponse> {
    return this.userService.deleteUser(id);
  }

  @Post('password')
  confirmPassword(
    @Body() passwordDto: PasswordDto,
    @Body('id') id: string,
  ): Promise<StatusResponse> {
    return this.userService.confirmPassword(id, passwordDto.password);
  }

  @Patch('password')
  changePassword(
    @Body() passwordDto: PasswordDto,
    @Body('id') id: string,
  ): Promise<StatusResponse> {
    return this.userService.changePassword(id, passwordDto.password);
  }
}
