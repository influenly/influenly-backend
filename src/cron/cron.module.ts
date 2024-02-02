import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { AnalyticsModule } from 'src/analytics/analytics.module';
import { IntegrationModule } from 'src/integration/integration.module';
import { CredentialService } from 'src/integration/credential/credential.service';
import { AnalyticsService } from 'src/analytics/analytics.service';
import { YoutubeService } from 'src/libs/youtube/youtube.service';

@Module({
  imports: [AnalyticsModule, IntegrationModule ],
  providers: [CronService, CredentialService, AnalyticsService, YoutubeService]
})
export class CronModule {}
