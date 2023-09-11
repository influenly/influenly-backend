import { Injectable, Logger, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Credentials, OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';

@Injectable({ scope: Scope.TRANSIENT })
export class GoogleService {
  private oAuth2Client: OAuth2Client;
  constructor(private readonly configService: ConfigService) {
    const { clientId, clientSecret } = configService.get('google');
    this.oAuth2Client = new google.auth.OAuth2(clientId, clientSecret);
  }

  async getToken(authorizationCode: string): Promise<Credentials> {
    const { tokens } = await this.oAuth2Client.getToken(authorizationCode);

    // const tokens = {
    //   access_token: 'access_token',
    //   refresh_token: 'refresh_token',
    //   expiry_date: 214748364,
    //   id_token: 'id_token'
    // };
    Logger.log(tokens);
    return tokens;
  }

  async setCredentials(tokens) {
    this.oAuth2Client.setCredentials(tokens);
  }

  async getChannel() {
    var service = google.youtube('v3');
    const a = await service.channels.list({
      auth: this.oAuth2Client,
      part: ['snippet,contentDetails,statistics'],
      mine: true
    });
    console.log(a);
  }
}
