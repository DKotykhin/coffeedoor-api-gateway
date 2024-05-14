import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';
import { RoleTypes } from '../src/common/types/enums';

const credentials = {
  email: 'kotykhin_d+1@ukr.net',
  password: 'Qq1234567',
};

describe('User Controller (e2e)', () => {
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

  let authToken: string;
  let userId: string;

  it('should login', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/sign-in')
      .send(credentials)
      .expect(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('email');
    expect(res.body.email).toBe(credentials.email);
    expect(res.body.role).toContain(RoleTypes.ADMIN || RoleTypes.SUBADMIN);
    expect(res.headers['set-cookie'][0]).toMatch(/auth_token=.+;/);
    const authTokenMatch =
      res.headers['set-cookie'][0].match(/auth_token=([^;]+)/);
    if (authTokenMatch && authTokenMatch.length > 1)
      authToken = authTokenMatch[1];
    userId = res.body.id;
  });

  it('should get user by token', async () => {
    const res = await request(app.getHttpServer())
      .get('/auth/user')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('email');
    expect(res.body.email).toBe(credentials.email);
    expect(res.body.role).toContain(RoleTypes.ADMIN || RoleTypes.SUBADMIN);
  });

  it('should get user by email', async () => {
    const res = await request(app.getHttpServer())
      .get('/user/get-by-email')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ email: credentials.email })
      .expect(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('email');
    expect(res.body.email).toBe(credentials.email);
    expect(res.body.role).toContain(RoleTypes.ADMIN || RoleTypes.SUBADMIN);
  });

  it('should get user by id', async () => {
    const res = await request(app.getHttpServer())
      .get('/user/get-by-id')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ id: userId })
      .expect(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('email');
    expect(res.body.email).toBe(credentials.email);
    expect(res.body.role).toContain(RoleTypes.ADMIN || RoleTypes.SUBADMIN);
  });

  it('should confirm password', async () => {
    const res = await request(app.getHttpServer())
      .post('/user/password')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ password: credentials.password })
      .set('Authorization', `Bearer ${authToken}`)
      .expect(201);
    expect(res.body).toHaveProperty('status', true);
  });
});
