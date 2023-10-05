import { SignUpRequestDto } from 'src/auth/dto';
import { User } from 'src/entities';
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
    getProfile(id: number): Promise<{
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
    create(signUpRequestDto: SignUpRequestDto): Promise<User>;
    updateById(id: number, updateUserDto: IUpdateUserInput): Promise<User>;
    completeOnboarding({ id, onboardingCompleted, type }: Partial<User>, completeOnboardingDto: CompleteOnboardingDto): Promise<{
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
        type: import("src/common/constants").UserType;
    }>;
    deleteUser(id: number): Promise<User>;
}
