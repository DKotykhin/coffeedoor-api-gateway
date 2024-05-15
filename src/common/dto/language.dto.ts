import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

import { LanguageCode } from '../types/enums';

export class LanguageDto {
  @ApiProperty()
  @IsEnum(LanguageCode)
  language: LanguageCode;
}
