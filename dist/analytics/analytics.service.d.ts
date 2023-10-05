import { AnalyticsYoutubeRepository } from './analytics-youtube/analytics-youtube.repository';
import { QueryRunner } from 'typeorm';
import { ICreateAnalyticsYoutubeInput } from './analytics-youtube/interfaces/create-analytics-youtube-input.interface';
export declare class AnalyticsService {
    private readonly analyticsYoutubeRepository;
    constructor(analyticsYoutubeRepository: AnalyticsYoutubeRepository);
    createBasicAnalytics(createAnalyticsYoutubeInput: ICreateAnalyticsYoutubeInput, queryRunner?: QueryRunner): Promise<import("../entities").AnalyticsYoutube>;
    getBasicAnalyticsByUserId(userId: number, queryRunner?: QueryRunner): Promise<import("../entities").AnalyticsYoutube[]>;
    getBasicAnalyticsByIntegrationId(integrationId: number, queryRunner?: QueryRunner): Promise<import("../entities").AnalyticsYoutube>;
}
