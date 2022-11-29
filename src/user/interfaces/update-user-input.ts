export interface IUpdateUserInput {
  id: number;
  password?: string;
  email?: string;
  country?: string;
  birthDate?: Date;
  emailConfirmed?: boolean;
  onboardingCompleted?: boolean;
}
