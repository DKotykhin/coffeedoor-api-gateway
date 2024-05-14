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
    const healthCheck = await this.healthCheckService.checkHealth();
    if (healthCheck.menuService.status !== 1) {
      this.logger.error('Menu service health check failed');
    }
    if (healthCheck.storeService.status !== 1) {
      this.logger.error('Store service health check failed');
    }
    if (healthCheck.userService.status !== 1) {
      this.logger.error('User service health check failed');
    }
    if (healthCheck.orderService.status !== 1) {
      this.logger.error('Order service health check failed');
    }
  }
}
