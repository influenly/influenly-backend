export interface IUpdateUserInput {
  profileId?: number;
  analyticsId?: number;
  password?: string;
  email?: string;
  country?: string;
  onboardingCompleted?: boolean;
}
