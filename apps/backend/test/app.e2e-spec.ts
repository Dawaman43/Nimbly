import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Cloud Resources Monitoring', () => {
    it('/cloud-resources (GET) - should return resources', () => {
      return request(app.getHttpServer()).get('/cloud-resources').expect(401); // Should require authentication
    });

    it('/monitoring/stats (GET) - should return monitoring stats', () => {
      return request(app.getHttpServer()).get('/monitoring/stats').expect(401); // Should require authentication
    });

    it('/monitoring/logs (GET) - should return monitoring logs', () => {
      return request(app.getHttpServer()).get('/monitoring/logs').expect(401); // Should require authentication
    });
  });
});
