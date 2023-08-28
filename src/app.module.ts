import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';
import { AnalyticsModule } from './analytics/analytics.module';
import { IntegrationModule } from './integration/integration.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { MailModule } from './libs/mail/mail.module';
import { GoogleModule } from './libs/google/google.module';
import APP_CONFIG from './config/app';
import DATABASE_CONFIG from './config/database';
import GOOGLE_CONFIG from './config/google';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { ChatModule } from './chat/chat.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [APP_CONFIG, DATABASE_CONFIG, GOOGLE_CONFIG],
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const { host, port, username, password, database } =
          configService.get('database');

        return {
          type: 'postgres',
          host,
          port,
          username,
          password,
          database,
          entities: entities,
          migrationsRun: false,
          logging: true,
          migrationsTableName: 'migration',
          migrations: [
            __dirname + '/migration/**/*.ts',
            __dirname + '/migration/**/*.js'
          ],
          synchronize: true,
          cli: {
            migrationsDir: 'src/migration'
          }
        };
      },
      inject: [ConfigService]
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10
    }),
    AnalyticsModule,
    IntegrationModule,
    AuthModule,
    UserModule,
    MailModule,
    GoogleModule,
    ChatModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    }
  ]
})
export class AppModule implements NestModule {
  static port: number;
  constructor(configService: ConfigService) {
    const {
      api: { port: apiPort }
    } = configService.get('app');
    AppModule.port = apiPort;
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
