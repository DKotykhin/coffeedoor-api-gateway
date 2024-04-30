import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { LanguageCode } from '../../types/enums';

export class CreateMenuItemDto {
  @ApiProperty({
    enum: LanguageCode,
    enumName: 'LanguageCode',
  })
  @IsEnum(LanguageCode)
  language: LanguageCode;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  price: string;

  @ApiProperty({ required: false, default: false })
  @IsOptional()
  @IsBoolean()
  hidden: boolean;

  @ApiProperty()
  @IsNumber()
  position: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  categoryId: string;
}
