import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, Module } from '@nestjs/common';
import * as request from 'supertest';
import { EchoModule } from 'src/echo/echo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { AuthModule } from 'src/auth/auth.module';
import { AuthGuard, PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/strategies/jwt-strategy';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  @Module({
    imports: [PassportModule.register({ defaultStrategy: 'jwt' })]
  })
  class MockModule {}

  beforeEach(async () => {
    let catsService = { findAll: () => ['test'] };
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [EchoModule]
    })
      .overrideGuard(AuthGuard)
      .useValue({ CanActivate: jest.fn(() => true) })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', async (done) => {
    const a = await request(app.getHttpServer()).get('/echo');
    console.log(a.body);
    expect(a.statusCode).toBe(200);
    done();
  });
});
