import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsYoutube } from 'src/entities';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { AnalyticsRepository } from './analytics.repository';
import { AnalyticsYoutubeRepository } from './analytics-youtube/analytics-youtube.repository';
import { IntegrationModule } from 'src/integration/integration.module';
import { IntegrationService } from 'src/integration/integration.service';

@Module({
  imports: [TypeOrmModule.forFeature([AnalyticsYoutube]), IntegrationModule],
  controllers: [AnalyticsController],
  providers: [
    AnalyticsService,
    AnalyticsRepository,
    AnalyticsYoutubeRepository,
    IntegrationService
  ],
  exports: [AnalyticsRepository]
})
export class AnalyticsModule {}
