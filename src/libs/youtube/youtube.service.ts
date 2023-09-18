import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { Credentials, OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import { Observable, map } from 'rxjs';

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

    console.log('tokens', tokens);
    const infoToken = await this.oAuth2Client.getTokenInfo(tokens.access_token);
    console.log(infoToken);
    return tokens;
  }

  // async setCredentials(credentials) {

  // }

  async getChannelInfo(credential: Credentials) {
    const service = google.youtube('v3');
    const oAuth2Client = this.oAuth2Client;
    console.log(credential);
    oAuth2Client.setCredentials(credential);
    const a = await service.channels.list({
      auth: oAuth2Client,
      part: ['snippet,statistics,id'],
      mine: true
    });
    return a.data.items;
  }

  async getChannelIdFrom(
    customUrlChannelName: string
  ): Promise<Observable<string>> {
    const url = `https://www.youtube.com/${customUrlChannelName}`;

    return this.httpService.get(url).pipe(
      map((response: AxiosResponse<string>) => {
        const data = response.data;
        const channelIdMatch = data.match(/"channelId":"([^"]+)"/);
        console.log(channelIdMatch);
        if (channelIdMatch && channelIdMatch.length > 1) {
          return channelIdMatch[1];
        } else {
          throw new Error('Channel ID not found');
        }
      })
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
