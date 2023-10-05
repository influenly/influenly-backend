export interface IUpdateUserInput {
    password?: string;
    email?: string;
    country?: string;
    onboardingCompleted?: boolean;
    username?: string;
    profileImg?: string;
    description?: string;
    contentTags?: string[];
    birthDate?: string;
}
