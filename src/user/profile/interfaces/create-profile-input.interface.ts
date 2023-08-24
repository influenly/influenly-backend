export interface ICreateProfileInput {
  username: string;
  country: string;
  profileImg: string;
  socialNetworks: string[];
  description: string;
  contentTags: string[];
  birthDate?: string;
}
