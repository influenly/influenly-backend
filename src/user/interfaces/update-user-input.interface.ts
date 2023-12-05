import { INetworks } from "src/common/interfaces";

export interface IUpdateUserInput {
  password?: string;
  email?: string;
  country?: string;
  onboardingCompleted?: boolean;
  username?: string;
  networks?: INetworks
  profileImg?: string;
  description?: string;
  contentTags?: string[];
  birthDate?: string;
}
