import { DataSource, Repository, QueryRunner } from 'typeorm';
import { AnalyticsYoutube } from 'src/entities';
import { ICreateBAYoutubeInput, IUpdateBAYoutubeInput } from './interfaces';
export declare class AnalyticsYoutubeRepository extends Repository<AnalyticsYoutube> {
    constructor(dataSource: DataSource);
    createAndSave(createAnalyticsYoutubeInput: ICreateBAYoutubeInput, queryRunner?: QueryRunner): Promise<AnalyticsYoutube>;
    findByUserId(userId: number, queryRunner?: QueryRunner): Promise<AnalyticsYoutube[]>;
    findByIntegrationId(integrationId: number, queryRunner?: QueryRunner): Promise<AnalyticsYoutube>;
    updateByIntegrationId(integrationId: number, udateBAYoutubeInput: IUpdateBAYoutubeInput, queryRunner?: QueryRunner): Promise<import("typeorm").UpdateResult>;
}
