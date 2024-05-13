import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { LanguageCode } from '../../common/types/enums';

export class CreateMenuCategoryDto {
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

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  image: string;

  @ApiProperty({ required: false, type: Boolean, default: false })
  @IsOptional()
  @IsBoolean()
  hidden: boolean;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  position: number;
}
