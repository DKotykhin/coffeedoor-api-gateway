import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class TokenDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Length(16, 128)
  token: string;
}
