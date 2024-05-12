import { ApiProperty } from '@nestjs/swagger';

export class StatusResponse {
  @ApiProperty()
  status: boolean;

  @ApiProperty()
  message: string;
}
