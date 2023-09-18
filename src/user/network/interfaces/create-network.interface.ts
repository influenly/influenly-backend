import { PlatformType } from 'src/common/constants/types/platform.type';

export interface ICreateNetworkInput {
  userId: number;
  platform: PlatformType;
  url: string;
  channelId: string;
  name: string;
  profileImg: string;
}
