import { QueryRunner } from 'typeorm';
import { AnalyticsYoutubeRepository } from './analytics-youtube/analytics-youtube.repository';
import { ICreateBAYoutubeInput, IUpdateBAYoutubeInput } from './analytics-youtube/interfaces';
export declare class AnalyticsService {
    private readonly analyticsYoutubeRepository;
    constructor(analyticsYoutubeRepository: AnalyticsYoutubeRepository);
    createBA(createBAYoutubeInput: ICreateBAYoutubeInput, queryRunner?: QueryRunner): Promise<import("../entities").AnalyticsYoutube>;
    updateBAByIntegrationId(integrationId: number, updateBAYoutubeInput: IUpdateBAYoutubeInput, queryRunner?: QueryRunner): Promise<import("typeorm").UpdateResult>;
    getBAByUserId(userId: number, queryRunner?: QueryRunner): Promise<import("../entities").AnalyticsYoutube[]>;
    getBAByIntegrationId(integrationId: number, queryRunner?: QueryRunner): Promise<import("../entities").AnalyticsYoutube>;
}
