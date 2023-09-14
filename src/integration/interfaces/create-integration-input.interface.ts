import { PlatformType } from 'src/common/constants/types/platform.type';

export interface ICreateIntegrationInput {
  userId: number;
  platform: PlatformType;
}
