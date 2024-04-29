import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

import {
  HEALTH_CHECK_SERVICE_NAME,
  HealthCheckClient,
  HealthCheckResponse,
} from './health-check.pb';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class HealthCheckService implements OnModuleInit {
  private menuHealthCheckService: HealthCheckClient;
  private menuService: HealthCheckResponse;
  private userHealthCheckService: HealthCheckClient;
  private userService: HealthCheckResponse;
  constructor(
    @Inject('MENU_HEALTH_CHECK_SERVICE')
    private readonly menuHealthCheckClient: ClientGrpc,
    @Inject('USER_HEALTH_CHECK_SERVICE')
    private readonly userHealthCheckClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.menuHealthCheckService = this.menuHealthCheckClient.getService(
      HEALTH_CHECK_SERVICE_NAME,
    );
    this.userHealthCheckService = this.userHealthCheckClient.getService(
      HEALTH_CHECK_SERVICE_NAME,
    );
  }

  async checkHealth(): Promise<{
    menuService: HealthCheckResponse;
    userService: HealthCheckResponse;
  }> {
    try {
      this.menuService = await firstValueFrom(
        this.menuHealthCheckService.check({}),
      );
    } catch (error) {
      this.menuService = { status: 0 };
    }

    try {
      this.userService = await firstValueFrom(
        this.userHealthCheckService.check({}),
      );
    } catch (error) {
      this.userService = { status: 0 };
    }

    return { menuService: this.menuService, userService: this.userService };
  }
}
