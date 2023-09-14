import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnalyticsModule } from 'src/analytics/analytics.module';
import { AuthModule } from 'src/auth/auth.module';

import { Integration } from 'src/entities';

import { IntegrationController } from './integration.controller';

import { YoutubeService } from 'src/libs/youtube/youtube.service';
import { IntegrationService } from './integration.service';

import { IntegrationRepository } from './integration.repository';
import { AnalyticsRepository } from 'src/analytics/analytics.repository';
import { AnalyticsYoutubeRepository } from 'src/analytics/analytics-youtube/analytics-youtube.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Integration]),
    AuthModule,
    AnalyticsModule
  ],
  controllers: [IntegrationController],
  providers: [
    IntegrationService,
    IntegrationRepository,
    AnalyticsRepository,
    YoutubeService,
    AnalyticsYoutubeRepository
  ]
})
export class IntegrationModule {}
