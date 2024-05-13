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

export class CreateStoreCategoryDto {
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
  subtitle: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  hidden?: boolean;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  position: number;
}
