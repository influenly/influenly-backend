import { BaseEntity } from 'typeorm';
import { UserType } from 'src/common/constants';
export declare class User extends BaseEntity {
    id: number;
    email: string;
    password: string;
    country: string;
    onboardingCompleted: boolean;
    role: string;
    type: UserType;
    username: string;
    profileImg: string;
    description: string;
    contentTags: string[];
    birthDate: Date;
    createdAt: Date;
    updatedAt: Date;
}
