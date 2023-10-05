import { UserService } from './user.service';
import { CompleteOnboardingDto, UpdateUserDto } from './dto';
import { User } from 'src/entities';
import { UpdateProfileDto } from './profile/dto/update-user-profile.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    completeOnboarding(user: User, completeOnboardingDto: CompleteOnboardingDto): Promise<{
        country: string;
        updatedUser: User;
        networks: {
            integratedNetworkWithBasicAnalytics: {
                basicAnalytics: {
                    totalSubs: number;
                    totalVideos: number;
                };
                id: number;
                userId: number;
                platform: "YOUTUBE" | "TIKTOK" | "FACEBOOK" | "INSTAGRAM" | "TWITCH" | "TWITTER" | "WEBSITE";
                integrated: boolean;
                url: string;
                channelId: string;
                name: string;
                profileImg: string;
                createdAt: Date;
                updatedAt: Date;
                user: User;
            };
            id: number;
            userId: number;
            platform: "YOUTUBE" | "TIKTOK" | "FACEBOOK" | "INSTAGRAM" | "TWITCH" | "TWITTER" | "WEBSITE";
            integrated: boolean;
            url: string;
            channelId: string;
            name: string;
            profileImg: string;
            createdAt: Date;
            updatedAt: Date;
            user: User;
        };
        type: import("../common/constants").UserType;
    }>;
    getUser(userId: number): Promise<User>;
    updateUser(user: User, updateUserDto: UpdateUserDto): Promise<User>;
    updateUserProfile({ id, country }: User, updateProfileDto: UpdateProfileDto): Promise<{
        country: string;
        id: number;
        email: string;
        password: string;
        onboardingCompleted: boolean;
        role: string;
        type: import("../common/constants").UserType;
        username: string;
        profileImg: string;
        description: string;
        contentTags: string[];
        birthDate: Date;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getUserProfile({ onboardingCompleted }: User, userId: number): Promise<{
        user: User;
        networks: Promise<import("src/entities").Network | {
            basicAnalytics: {
                totalSubs: number;
                totalVideos: number;
            };
            id: number;
            userId: number;
            platform: "YOUTUBE" | "TIKTOK" | "FACEBOOK" | "INSTAGRAM" | "TWITCH" | "TWITTER" | "WEBSITE";
            integrated: boolean;
            url: string;
            channelId: string;
            name: string;
            profileImg: string;
            createdAt: Date;
            updatedAt: Date;
            user: User;
        }>[];
    }>;
}
