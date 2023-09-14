import { Injectable, Logger, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Credentials, OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import { Credential } from 'src/entities';

@Injectable()
export class YoutubeService {
  private oAuth2Client: OAuth2Client;
  constructor(private readonly configService: ConfigService) {
    const { clientId, clientSecret } = configService.get('google');
    this.oAuth2Client = new google.auth.OAuth2(
      clientId,
      clientSecret,
      'http://localhost:4200'
    );
  }

  async getToken(authorizationCode: string): Promise<Credentials> {
    const { tokens } = await this.oAuth2Client.getToken(authorizationCode);

    Logger.log(tokens);
    return tokens;
  }

  // async setCredentials(credentials) {

  // }

  async getChannelInfo(credential: Credential) {
    const service = google.youtube('v3');
    const oAuth2Client = this.oAuth2Client;
    oAuth2Client.setCredentials(credential);
    const a = await service.channels.list({
      auth: oAuth2Client,
      part: ['snippet,contentDetails,statistics,id'],
      mine: true
    });
    return a;
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
