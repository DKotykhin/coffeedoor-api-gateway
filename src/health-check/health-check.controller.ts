import { Controller, Get, Logger } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Cron } from '@nestjs/schedule';

import { HealthCheckService } from './health-check.service';
import { HealthCheckResponseDto } from './dto/health-check-response.dto';

@ApiTags('health-check')
@Controller('health-check')
export class HealthCheckController {
  constructor(private readonly healthCheckService: HealthCheckService) {}
  protected readonly logger = new Logger(HealthCheckController.name);

  @Get()
  @ApiOperation({ summary: 'Check microservices connection' })
  @ApiResponse({
    status: 200,
    type: HealthCheckResponseDto,
    description:
      'Health check statuses: 0 - UNKNOWN, 1 - SERVING, 2 - NOT_SERVING, -1 - UNRECOGNIZED',
  })
  checkHealth(): Promise<HealthCheckResponseDto> {
    return this.healthCheckService.checkHealth();
  }

  @Cron('*/1 * * * *')
  async handleCron() {
    await this.healthCheckService.checkHealth();
  }
}
