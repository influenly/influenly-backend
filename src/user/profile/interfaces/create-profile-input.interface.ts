export interface ICreateProfileInput {
  userId: number;
  username: string;
  profileImg?: string;
  socialNetworks: string[];
  description: string;
  contentTags: string[];
  birthDate?: string;
}
