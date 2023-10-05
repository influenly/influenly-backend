import { DataSource, Repository, QueryRunner } from 'typeorm';
import { AnalyticsYoutube } from 'src/entities';
import { ICreateAnalyticsYoutubeInput } from './interfaces/create-analytics-youtube-input.interface';
export declare class AnalyticsYoutubeRepository extends Repository<AnalyticsYoutube> {
    constructor(dataSource: DataSource);
    createAndSave(createAnalyticsYoutubeInput: ICreateAnalyticsYoutubeInput, queryRunner?: QueryRunner): Promise<AnalyticsYoutube>;
    findByUserId(userId: number, queryRunner?: QueryRunner): Promise<AnalyticsYoutube[]>;
    findByIntegrationId(integrationId: number, queryRunner?: QueryRunner): Promise<AnalyticsYoutube>;
}
