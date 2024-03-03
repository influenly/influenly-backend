import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { AnalyticsModule } from 'src/analytics/analytics.module';
import { IntegrationModule } from 'src/integration/integration.module';
import { CredentialService } from 'src/integration/credential/credential.service';
import { AnalyticsService } from 'src/analytics/analytics.service';
import { YoutubeService } from 'src/libs/youtube/youtube.service';
import { CredentialRepository } from 'src/integration/credential/credential.repository';
import { AnalyticsYoutubeRepository } from 'src/analytics/analytics-youtube/analytics-youtube.repository';

@Module({
  imports: [ AnalyticsModule, IntegrationModule],
  providers: [CronService, CredentialService, CredentialRepository, AnalyticsYoutubeRepository, AnalyticsService, YoutubeService]
})
export class CronModule {}
