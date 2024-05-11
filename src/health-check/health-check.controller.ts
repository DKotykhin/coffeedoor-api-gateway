import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { HealthCheckService } from './health-check.service';

@ApiTags('health-check')
@Controller('health-check')
export class HealthCheckController {
  constructor(private readonly healthCheckService: HealthCheckService) {}

  @Get()
  @ApiOperation({ summary: 'Check microservices connection' })
  checkHealth() {
    return this.healthCheckService.checkHealth();
  }
}
