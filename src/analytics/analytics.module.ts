import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Analytics, AnalyticsYoutube } from 'src/entities';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { AnalyticsRepository } from './analytics.repository';
import { AnalyticsYoutubeRepository } from './analytics-youtube/analytics-youtube.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Analytics, AnalyticsYoutube])],
  controllers: [AnalyticsController],
  providers: [
    AnalyticsService,
    AnalyticsRepository,
    AnalyticsYoutubeRepository
  ],
  exports: [AnalyticsRepository]
})
export class AnalyticsModule {}
