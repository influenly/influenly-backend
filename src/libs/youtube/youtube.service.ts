import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { channel } from 'diagnostics_channel';
import { Credentials, OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import { firstValueFrom, map } from 'rxjs';

@Injectable()
export class YoutubeService {
  private oAuth2Client: OAuth2Client;
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService
  ) {
    const { clientId, clientSecret } = configService.get('google');
    this.oAuth2Client = new google.auth.OAuth2(
      clientId,
      clientSecret,
      'http://localhost:4200'
    );
  }

  async getToken(authorizationCode: string): Promise<Credentials> {
    const { tokens } = await this.oAuth2Client.getToken(authorizationCode);
    return tokens;
  }

  async getChannelInfo(accessToken: string, integrationId?: number) {
    const service = google.youtube('v3');

    const oAuth2Client = this.oAuth2Client;
    oAuth2Client.setCredentials({
      access_token: accessToken
    });

    const {
      data: { items }
    } = await service.channels.list({
      auth: oAuth2Client,
      part: ['snippet,statistics,id'],
      mine: true
    });

    const channelInfo = items[0];

    return {
      id: channelInfo.id,
      name: channelInfo.snippet.title,
      profileImg: channelInfo.snippet.thumbnails.default.url,
      totalSubs: channelInfo.statistics.subscriberCount,
      totalVideos: channelInfo.statistics.videoCount,
      integrationId
    };
  }

  async getChannelInfoFromUrl(
    url: string
  ): Promise<{ valid: boolean; id?: string; name?: string; url?: string }> {
    try {
      const response = await firstValueFrom(this.httpService.get(url));
      console.log(response);
      const { data } = response;

      const regexChannelId = /"channelId":"([^"]+)"/;
      const channelId = data.match(regexChannelId)[1];

      const regexChannelName =
        /<meta\s+property="og:title"\s+content="([^"]+)">/;
      const channelName = data.match(regexChannelName)[1];

      return {
        valid: Boolean(channelId && channelName),
        id: channelId,
        name: channelName,
        url: `https://www.youtube.com/channel/${channelId}`
      };
    } catch (error) {
      console.log('hola');
      Logger.log(error);
      return {
        valid: false
      };
    }
  }

  async getMonthlyAA() {
    const service = google.youtubeAnalytics('v2');

    const result = await service.reports.query({
      auth: this.oAuth2Client,
      startDate: '2023-01-01',
      endDate: '2024-01-01',
      ids: 'channel==MINE',
      metrics: 'views,comments,likes,averageViewDuration',
      dimensions: 'month'
    });
    return result.data;
  }
}
