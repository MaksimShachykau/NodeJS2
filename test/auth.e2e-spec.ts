import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { disconnect } from 'mongoose';
import { AuthDto } from 'src/auth/dto/auth.dto';

const loginDto: AuthDto = {
  login: 'a@a.a',
  password: 'a',
};
describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    await request(app.getHttpServer()).post('/auth/register').send(loginDto);
  });

  it('/auth/login (POST) - SUCCESS', () => {
    return request(app.getHttpServer()).post('/auth/login').send(loginDto).expect(200);
  });

  it('/auth/login (POST) - FAIL(wrong password)', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...loginDto, password: 'a2' })
      .expect(401, {
        statusCode: 401,
        message: 'password is not valid',
        error: 'Unauthorized',
      });
  });

  it('/auth/login (POST) - FAIL(wrong login)', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ ...loginDto, login: 'a2@a.a' })
      .expect(401, {
        statusCode: 401,
        message: 'user with this email did not found',
        error: 'Unauthorized',
      });
  });

  afterAll(() => {
    disconnect();
  });
});
