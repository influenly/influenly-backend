import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AnalyticsService } from '../analytics/analytics.service';
import { CredentialService } from '../integration/credential/credential.service';
import { YoutubeService } from '../libs/youtube/youtube.service';

@Injectable()
export class CronService {
  constructor(
    private readonly analyticsService: AnalyticsService,
    private readonly youtubeService: YoutubeService,
    private readonly credentialService: CredentialService
  ) {}
  @Cron(CronExpression.EVERY_MINUTE)
  async updateBAYoutube() {
    try {
      const credentials = await this.credentialService.getAll();

      const channelInfoPromises = credentials.map((credential) => {
        const { accessToken, integrationId } = credential;
        return this.youtubeService.getChannelInfo(accessToken, integrationId);
      });

      const channelInfoResults = await Promise.all(channelInfoPromises);

      for (const channelInfo of channelInfoResults) {
        const { integrationId, name, profileImg, totalSubs, totalVideos } =
          channelInfo;
        await this.analyticsService.updateBAByIntegrationId(integrationId, {
          totalSubs: parseInt(totalSubs),
          totalVideos: parseInt(totalVideos),
          name,
          profileImg
        });
      }

      console.log('Actualización exitosa de YouTube Analytics.');
    } catch (error) {
      console.error('Error al actualizar YouTube Analytics:', error);
    }
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async updateAAYoutube() {
    try {
      const credentials = await this.credentialService.getAll();

      const channelInfoPromises = credentials.map((credential) => {
        const { accessToken, integrationId } = credential;
        return this.youtubeService.getChannelInfo(accessToken, integrationId);
      });

      const channelInfoResults = await Promise.all(channelInfoPromises);

      for (const channelInfo of channelInfoResults) {
        const { integrationId, name, profileImg, totalSubs, totalVideos } =
          channelInfo;
        await this.analyticsService.updateBAByIntegrationId(integrationId, {
          totalSubs: parseInt(totalSubs),
          totalVideos: parseInt(totalVideos),
          name,
          profileImg
        });
      }

      console.log('Actualización exitosa de YouTube Analytics.');
    } catch (error) {
      console.error('Error al actualizar YouTube Analytics:', error);
    }
  }
}
