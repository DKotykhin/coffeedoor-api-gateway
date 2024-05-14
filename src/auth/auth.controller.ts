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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UserDto } from '../user/dto/user.dto';
import { StatusResponse } from '../common/dto/status-response.dto';

import { AuthService } from './auth.service';
import { EmailDto, PasswordDto, SignInDto, SignUpDto } from './dto/auth.dto';
import { GetUser } from './decorators/get-user.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/user')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user by token' })
  @ApiResponse({ status: 200, type: UserDto })
  getUserByToken(@GetUser() user: UserDto): Promise<UserDto> {
    return this.authService.getUserByToken(user);
  }

  @Post('/sign-up')
  @ApiOperation({ summary: 'Sign up' })
  @ApiResponse({ status: 201, type: UserDto })
  signUp(@Body() signUpDto: SignUpDto): Promise<UserDto> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/sign-in')
  @ApiOperation({ summary: 'Sign in' })
  @ApiResponse({ status: 201, type: UserDto })
  signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<UserDto> {
    return this.authService.signIn(signInDto, response);
  }

  @Get('/confirm-email/:token')
  @ApiOperation({ summary: 'Confirm email' })
  @ApiResponse({
    status: 200,
    type: StatusResponse,
  })
  confirmEmail(@Param('token') token: string): Promise<StatusResponse> {
    return this.authService.confirmEmail(token);
  }

  @Get('/resend-email')
  @ApiOperation({ summary: 'Resend email' })
  @ApiBody({ type: EmailDto })
  @ApiResponse({
    status: 200,
    type: StatusResponse,
  })
  resendEmail(@Body() emailDto: EmailDto): Promise<StatusResponse> {
    return this.authService.resendEmail(emailDto.email);
  }

  @Post('/reset-password')
  @ApiOperation({ summary: 'Reset password' })
  @ApiResponse({
    status: 200,
    type: StatusResponse,
  })
  resetPassword(@Body() emailDto: EmailDto): Promise<StatusResponse> {
    return this.authService.resetPassword(emailDto);
  }

  @Post('new-password/:token')
  @ApiOperation({ summary: 'Set new password' })
  @ApiResponse({
    status: 200,
    type: StatusResponse,
  })
  setNewPassword(
    @Param('token') token: string,
    @Body() passwordDto: PasswordDto,
  ): Promise<StatusResponse> {
    return this.authService.setNewPassword(token, passwordDto.password);
  }
}
