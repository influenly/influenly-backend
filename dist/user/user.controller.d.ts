import { UserService } from './user.service';
import { CompleteOnboardingDto, UpdateUserDto } from './dto';
import { User } from 'src/entities';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    completeOnboarding(user: User, completeOnboardingDto: CompleteOnboardingDto): Promise<{
        ok: boolean;
        user: {
            networks: ({
                channelId: string;
                name: string;
                userId: number;
                url: string;
                platform: import("../common/constants/enums").Platforms.YOUTUBE;
            } | Partial<import("src/entities").Network>)[];
            id: number;
            email: string;
            password: string;
            country: string;
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
        };
    }>;
    getUser(userId: number): Promise<{
        ok: boolean;
        user: User;
    }>;
    updateUser(user: User, updateUserDto: UpdateUserDto): Promise<{
        ok: boolean;
        user: {
            networks: import("src/entities").Network[];
            id: number;
            email: string;
            password: string;
            country: string;
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
        };
    }>;
    getUserProfile({ onboardingCompleted }: User, userId: number): Promise<{
        ok: boolean;
        user: {
            networks: {
                basicAnalytics: {
                    totalSubs: number;
                    totalVideos: number;
                };
                id: number;
                userId: number;
                platform: "YOUTUBE" | "TIKTOK" | "FACEBOOK" | "INSTAGRAM" | "TWITCH" | "TWITTER" | "WEBSITE";
                integrated: boolean;
                url: string;
                channelId?: string;
                name: string;
                profileImg: string;
                createdAt: Date;
                updatedAt: Date;
                user: User;
            }[];
            id: number;
            email: string;
            password: string;
            country: string;
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
        };
    }>;
    getCreators(user: User, followersRange: string, contentTags: string): Promise<{
        ok: boolean;
        data: {
            totalFollowers: number;
            networks: {
                basicAnalytics: {
                    totalSubs: number;
                    totalVideos: number;
                };
                id: number;
                userId: number;
                platform: "YOUTUBE" | "TIKTOK" | "FACEBOOK" | "INSTAGRAM" | "TWITCH" | "TWITTER" | "WEBSITE";
                integrated: boolean;
                url: string;
                channelId?: string;
                name: string;
                profileImg: string;
                createdAt: Date;
                updatedAt: Date;
                user: User;
            }[];
            id: number;
            email: string;
            password: string;
            country: string;
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
        }[];
    }>;
}
