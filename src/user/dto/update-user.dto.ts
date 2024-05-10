import { IsString, Length, IsOptional, IsMobilePhone } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty({
    description: 'User Name',
    type: String,
    example: 'kotykhin_d',
    minLength: 2,
    maxLength: 30,
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(2, 30, { message: 'Name must be between 2 and 30 characters' })
  userName?: string;

  @ApiProperty({
    description: 'User address',
    type: String,
    example: 'Kyiv, Ukraine',
    minLength: 2,
    maxLength: 200,
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(2, 200, { message: 'Address must be between 2 and 200 characters' })
  address?: string;

  @ApiProperty({
    description: 'User Phone Number',
    type: String,
    example: '+380123456789',
    minLength: 10,
    maxLength: 13,
    required: false,
  })
  @IsOptional()
  @IsString()
  @Length(10, 13, { message: 'Phone must be between 10 and 13 characters' })
  @IsMobilePhone('uk-UA')
  phoneNumber?: string;
}
