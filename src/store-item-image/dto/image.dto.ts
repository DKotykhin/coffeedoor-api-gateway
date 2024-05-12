import { ApiProperty } from '@nestjs/swagger';

export class ImageDto {
  @ApiProperty()
  image: string;
}
