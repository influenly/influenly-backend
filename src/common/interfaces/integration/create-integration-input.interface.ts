import { Platform } from 'src/common/constants/types/platform';

export interface ICreateIntegrationInput {
  accessToken: string;
  tokenExpiresIn: number;
  refreshToken: string;
  platform: Platform;
}
