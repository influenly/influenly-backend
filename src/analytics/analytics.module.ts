import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsYoutube } from 'src/entities';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { AnalyticsYoutubeRepository } from './analytics-youtube/analytics-youtube.repository';
import { IntegrationModule } from 'src/integration/integration.module';
import { IntegrationService } from 'src/integration/integration.service';
import { YoutubeService } from 'src/libs/youtube/youtube.service';
import { IntegrationRepository } from 'src/integration/integration.repository';
import { CredentialService } from 'src/integration/credential/credential.service';
import { CredentialRepository } from 'src/integration/credential/credential.repository';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([AnalyticsYoutube]),
    forwardRef(() => IntegrationModule),
    HttpModule
  ],
  controllers: [AnalyticsController],
  providers: [
    AnalyticsService,
    IntegrationRepository,
    CredentialService,
    CredentialRepository,
    AnalyticsYoutubeRepository,
    IntegrationService,
    YoutubeService
  ],
  exports: [AnalyticsService, AnalyticsYoutubeRepository, YoutubeService]
})
export class AnalyticsModule {}
