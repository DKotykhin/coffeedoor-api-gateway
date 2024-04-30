import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { StatusResponse, User } from './auth.pb';
import { EmailDto, PasswordDto, SignInDto, SignUpDto } from './dto/auth.dto';
import { GetUser } from './decorators/get-user.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Get('/user')
  getUserByToken(@GetUser() user: Partial<User>): Partial<User> {
    return user;
  }

  @Post('/sign-up')
  signUp(@Body() signUpDto: SignUpDto): Promise<Partial<User>> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/sign-in')
  signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Partial<User>> {
    return this.authService.signIn(signInDto, response);
  }

  @Get('/confirm-email/:token')
  confirmEmail(@Param('token') token: string): Promise<StatusResponse> {
    return this.authService.confirmEmail(token);
  }

  @Get('/resend-email')
  resendEmail(
    @Body('email') email: EmailDto['email'],
  ): Promise<StatusResponse> {
    return this.authService.resendEmail(email);
  }

  @Post('/reset-password')
  resetPassword(@Body() emailDto: EmailDto): Promise<StatusResponse> {
    return this.authService.resetPassword(emailDto);
  }

  @Post('new-password/:token')
  newPassword(
    @Param('token') token: string,
    @Body() passwordDto: PasswordDto,
  ): Promise<StatusResponse> {
    return this.authService.setNewPassword(token, passwordDto.password);
  }
}
