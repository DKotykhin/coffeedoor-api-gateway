import { ApiProperty } from '@nestjs/swagger';
import { LanguageCode } from '../../common/types/enums';

export class MenuItemDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ enum: LanguageCode })
  language: LanguageCode | string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  price: string;

  @ApiProperty()
  hidden: boolean;

  @ApiProperty()
  position: number;
}
