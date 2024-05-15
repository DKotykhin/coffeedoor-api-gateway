import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';
import { CreateStoreCategoryDto } from '../src/store-category/dto/_index';
import { LanguageCode, RoleTypes } from '../src/common/types/enums';
import { SignInDto } from '../src/auth/dto/auth.dto';

const credentials: SignInDto = {
  email: 'kotykhin_d+1@ukr.net',
  password: 'Qq1234567',
};

const mockCreateStoreCategory: CreateStoreCategoryDto = {
  language: LanguageCode.UA,
  title: 'New title',
  subtitle: 'New subtitle',
  hidden: false,
  position: 111,
};

describe('Store Controller (e2e)', () => {
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

  it('get all store by language', async () => {
    const res = await request(app.getHttpServer())
      .get('/all-store?language=UA')
      .expect(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  let authToken: string;
  let storeCategoryId: string;

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
  });

  it('get all store categories', async () => {
    const res = await request(app.getHttpServer())
      .get('/store-categories')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('create store category', async () => {
    const res = await request(app.getHttpServer())
      .post('/store-categories')
      .set('Authorization', `Bearer ${authToken}`)
      .send(mockCreateStoreCategory)
      .expect(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.language).toBe(mockCreateStoreCategory.language);
    expect(res.body.title).toBe(mockCreateStoreCategory.title);
    expect(res.body.subtitle).toBe(mockCreateStoreCategory.subtitle);
    storeCategoryId = res.body.id;
  });

  it('get store category by id', async () => {
    const res = await request(app.getHttpServer())
      .get(`/store-categories/${storeCategoryId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);
    expect(res.body).toHaveProperty('id', storeCategoryId);
  });

  it('update store category', async () => {
    const res = await request(app.getHttpServer())
      .patch(`/store-categories/${storeCategoryId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({ title: 'Updated title' })
      .expect(200);
    expect(res.body).toHaveProperty('id', storeCategoryId);
    expect(res.body.title).toBe('Updated title');
  });

  it('delete store category', async () => {
    const res = await request(app.getHttpServer())
      .delete(`/store-categories/${storeCategoryId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200);
    expect(res.body).toHaveProperty('status', true);
  });

  it('should not get store category by id - not found', async () => {
    const res = await request(app.getHttpServer())
      .get(`/store-categories/${storeCategoryId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(404);
    expect(res.body).toHaveProperty('statusCode', 404);
  });
});
