export interface ICreateProfileInput {
  username: string;
  profileImg?: string;
  socialNetworks: string[];
  description: string;
  contentTags: string[];
  birthDate?: string;
}
