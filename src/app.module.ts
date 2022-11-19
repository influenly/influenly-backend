import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';
import { AdvertiserModule } from './advertiser/advertiser.module';
import { CreatorModule } from './creator/creator.module';
import { ConnectionModule } from './connection/connection.module';
import { ContractModule } from './contract/contract.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { YoutubeTokenInfoModule } from './youtube-token-info/youtube-token-info.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities,
        synchronize: true
      }),
      inject: [ConfigService]
    }),
    AdvertiserModule,
    CreatorModule,
    ConnectionModule,
    ContractModule,
    AnalyticsModule,
    YoutubeTokenInfoModule
  ]
})
export class AppModule {
  static port: number
  constructor(configService: ConfigService) {
    AppModule.port = configService.get('API_PORT')
  }
}
