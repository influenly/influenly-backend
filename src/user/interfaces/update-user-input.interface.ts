import { INetworkInput } from 'src/common/interfaces';

export interface IUpdateUserInput {
  password?: string;
  email?: string;
  country?: string;
  onboardingCompleted?: boolean;
  username?: string;
  networks?: INetworkInput[];
  profileImg?: string;
  description?: string;
  contentTags?: string[];
  birthDate?: string;
  totalFollowers?: number;
}
