import { Injectable } from '@nestjs/common';
import { Credentials, OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';

const CLIENT_ID = 'TODO';
const CLIENT_SECRET = 'TODO';
const REDIRECT_URL = 'TODO'; //??

@Injectable()
export class GoogleService {
  private oAuth2Client: OAuth2Client;
  constructor() {
    this.oAuth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      REDIRECT_URL //??
    );
  }

  async getToken(authorizationCode: string): Promise<Credentials> {
    const { tokens } = await this.oAuth2Client.getToken(authorizationCode);
    return tokens;
  }

  private async setCredentials(authorizationCode: string) {
    const tokens = await this.getToken(authorizationCode);
    this.oAuth2Client.setCredentials(tokens);
  }
}
