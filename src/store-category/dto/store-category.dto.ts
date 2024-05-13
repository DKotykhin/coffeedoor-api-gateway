import { ApiProperty } from '@nestjs/swagger';
import { LanguageCode } from '../../common/types/enums';

export class StoreCategoryDto {
  @ApiProperty()
  id: string;

  @ApiProperty({
    enum: LanguageCode,
    enumName: 'LanguageCode',
  })
  language: LanguageCode | string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  subtitle: string;

  @ApiProperty()
  hidden: boolean;

  @ApiProperty()
  position: number;
}
