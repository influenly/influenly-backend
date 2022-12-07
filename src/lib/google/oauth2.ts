import { Credentials, OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';

const CLIENT_ID = 'TODO';
const CLIENT_SECRET = 'TODO';
const REDIRECT_URL = 'TODO';

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL
);

const getToken = async (
  oauth2Client: OAuth2Client,
  authorizationCode: string
): Promise<Credentials> => {
  const { tokens } = await oauth2Client.getToken(authorizationCode);
  return tokens;
};

export const setCredentials = async (
  oauth2Client: OAuth2Client,
  authorizationCode: string
) => {
  const tokens = await getToken(oauth2Client, authorizationCode);
  oauth2Client.setCredentials(tokens);
};
