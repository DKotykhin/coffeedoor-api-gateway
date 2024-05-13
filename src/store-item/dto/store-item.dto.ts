import { ApiProperty } from '@nestjs/swagger';

import { LanguageCode } from '../../common/types/enums';
import { IdDto } from '../../common/dto/id.dto';

export class StoreItemDto {
  @ApiProperty()
  slug: string;

  @ApiProperty({
    enum: LanguageCode,
    enumName: 'LanguageCode',
  })
  language: LanguageCode | string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  details: string;

  @ApiProperty()
  sortKey: string;

  @ApiProperty()
  sortValue: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  tm: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  oldPrice: number;

  @ApiProperty()
  discount: number;

  @ApiProperty()
  weight: number;

  @ApiProperty()
  hidden: boolean;

  @ApiProperty()
  position: number;

  @ApiProperty()
  category?: IdDto;
}
