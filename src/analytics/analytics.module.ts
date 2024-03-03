import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsYoutube } from 'src/entities';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { AnalyticsYoutubeRepository } from './analytics-youtube/analytics-youtube.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AnalyticsYoutube])],
  controllers: [AnalyticsController],
  providers: [AnalyticsService, AnalyticsYoutubeRepository],
  exports: [AnalyticsService]
})
export class AnalyticsModule {}
