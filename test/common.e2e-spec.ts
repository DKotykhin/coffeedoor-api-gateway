import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';

describe('Common Controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/ (GET)', async () => {
    await request(app.getHttpServer()).get('/').expect(404);
  });

  it('health-check', async () => {
    const res = await request(app.getHttpServer())
      .get('/health-check')
      .expect(200);
    expect(res.body).toHaveProperty('menuService');
    expect(res.body.menuService).toHaveProperty('status', 1);
    expect(res.body).toHaveProperty('orderService');
    expect(res.body.orderService).toHaveProperty('status', 1);
    expect(res.body).toHaveProperty('storeService');
    expect(res.body.storeService).toHaveProperty('status', 1);
    expect(res.body).toHaveProperty('userService');
    expect(res.body.userService).toHaveProperty('status', 1);
  });
});
