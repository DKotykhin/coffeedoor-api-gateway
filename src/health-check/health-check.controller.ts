import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { HealthCheckService } from './health-check.service';
import { HealthCheckResponseDto } from './dto/health-check-response.dto';

@ApiTags('health-check')
@Controller('health-check')
export class HealthCheckController {
  constructor(private readonly healthCheckService: HealthCheckService) {}

  @Get()
  @ApiOperation({ summary: 'Check microservices connection' })
  @ApiResponse({
    status: 200,
    type: HealthCheckResponseDto,
    description:
      'Health check statuses: 0 - UNKNOWN, 1 - SERVING, 2 - NOT_SERVING, -1 - UNRECOGNIZED',
  })
  checkHealth() {
    return this.healthCheckService.checkHealth();
  }
}
