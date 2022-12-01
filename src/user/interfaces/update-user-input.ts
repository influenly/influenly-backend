export interface IUpdateUserInput {
  id: number;
  password?: string;
  email?: string;
  country?: string;
  emailConfirmed?: boolean;
  onboardingCompleted?: boolean;
}
