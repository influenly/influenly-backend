export interface ICreateCredentialInput {
  integrationId: number;
  accessToken: string;
  expiryDate: number;
  idToken: string | null;
  scope: string;
  refreshToken: string;
}
