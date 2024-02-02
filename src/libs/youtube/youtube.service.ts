import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
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

  async getChannelInfoFromUrl(url: string) {
    return firstValueFrom(
      this.httpService.get(url).pipe(
        map((response: AxiosResponse<string>) => {
          try {
            const { data } = response;

            const regexChannelId = /"channelId":"([^"]+)"/;
            const channelId = data.match(regexChannelId)[1];

            const regexChannelName =
              /<meta\s+property="og:title"\s+content="([^"]+)">/;
            const channelName = data.match(regexChannelName)[1];

            return {
              id: channelId,
              name: channelName
            };
          } catch (error) {
            Logger.log(error);
            return 'NOT FOUND';
          }
        })
      )
    );
  }

  // async getAnalytics() {
  //   const service = google.youtubeAnalytics('v2');

  //   const a = await service.reports.query({
  //     auth: this.oAuth2Client,
  //     startDate: '1990-01-01',
  //     endDate: '2023-09-11',
  //     ids: 'channel==MINE',
  //     metrics:
  //       'views,comments,likes,dislikes,estimatedMinutesWatched,averageViewDuration'
  //   });
  //   return a.data;
  // }
}
