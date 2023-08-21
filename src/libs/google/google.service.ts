import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Credentials, OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';

@Injectable()
export class GoogleService {
  private oAuth2Client: OAuth2Client;
  constructor(private readonly configService: ConfigService) {
    const { clientId, clientSecret } = configService.get('google');
    this.oAuth2Client = new google.auth.OAuth2(clientId, clientSecret);
  }

  async getToken(authorizationCode: string): Promise<Credentials> {
    const { tokens } = await this.oAuth2Client.getToken(authorizationCode);
    Logger.log(tokens);
    return tokens;
  }

  // private async setCredentials(authorizationCode: string) {
  //   const tokens = await this.getToken(authorizationCode);
  //   this.oAuth2Client.setCredentials(tokens);
  // }
}
