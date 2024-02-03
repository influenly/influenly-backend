import { SignUpRequestDto } from 'src/auth/dto';
import { Network, User } from 'src/entities';
import { DataSource } from 'typeorm';
import { UserRepository } from './user.repository';
import { CompleteOnboardingDto } from './dto';
import { IUpdateUserInput } from './interfaces';
import { IntegrationService } from 'src/integration/integration.service';
import { AnalyticsService } from 'src/analytics/analytics.service';
import { NetworkService } from './network/network.service';
import { YoutubeService } from '../libs/youtube/youtube.service';
export declare class UserService {
    private readonly userRepository;
    private readonly networkService;
    private readonly analyticsService;
    private readonly integrationService;
    private readonly youtubeService;
    private readonly dataSource;
    constructor(userRepository: UserRepository, networkService: NetworkService, analyticsService: AnalyticsService, integrationService: IntegrationService, youtubeService: YoutubeService, dataSource: DataSource);
    getUserById(id: number): Promise<User>;
    getUserByEmail(email: string): Promise<User>;
    getCreators({ minFollowers, maxFollowers, contentTagsArr }: {
        minFollowers: any;
        maxFollowers: any;
        contentTagsArr: any;
    }): Promise<{
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
        type: import("src/common/constants").UserType;
        username: string;
        profileImg: string;
        description: string;
        contentTags: string[];
        birthDate: Date;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getProfileByUserId(id: number): Promise<{
        user: User;
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
    }>;
    getBAForIntegratedNetworks(userNetworks: Network[]): Promise<{
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
    }[]>;
    create(signUpRequestDto: SignUpRequestDto): Promise<User>;
    updateById(user: User, updateUserDto: IUpdateUserInput): Promise<{
        user: User;
        networks: Network[];
    }>;
    completeOnboarding(user: User, completeOnboardingDto: CompleteOnboardingDto): Promise<{
        updatedUser: User;
        networks: ({
            channelId: string;
            name: string;
            userId: number;
            url: string;
            platform: import("../common/constants/enums").Platforms.YOUTUBE;
        } | Partial<Network>)[];
    }>;
    deleteUser(id: number): Promise<User>;
}
