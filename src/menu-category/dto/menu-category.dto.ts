import { ApiProperty } from '@nestjs/swagger';
import { LanguageCode } from '../../common/types/enums';

export class MenuCategoryDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ enum: LanguageCode })
  language: LanguageCode | string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  hidden: boolean;

  @ApiProperty()
  position: number;
}
