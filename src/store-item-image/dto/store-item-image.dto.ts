import { ApiProperty } from '@nestjs/swagger';

class SlugDto {
  @ApiProperty()
  slug: string;
}

export class StoreItemImageDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  position: number;

  @ApiProperty({ type: SlugDto, required: false })
  storeItem?: SlugDto;
}
