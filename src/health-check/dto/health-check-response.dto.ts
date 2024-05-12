import { ApiProperty } from '@nestjs/swagger';
import { HealthCheckResponse_ServingStatus } from '../health-check.pb';

class StatusDto {
  @ApiProperty({ enum: HealthCheckResponse_ServingStatus })
  status: HealthCheckResponse_ServingStatus;
}

export class HealthCheckResponseDto {
  @ApiProperty({ type: StatusDto })
  menuService: StatusDto;

  @ApiProperty({ type: StatusDto })
  storeService: StatusDto;

  @ApiProperty({ type: StatusDto })
  userService: StatusDto;

  @ApiProperty({ type: StatusDto })
  orderService: StatusDto;
}
