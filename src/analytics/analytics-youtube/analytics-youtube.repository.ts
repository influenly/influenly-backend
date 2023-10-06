import { DataSource, Repository, QueryRunner } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { AnalyticsYoutube } from 'src/entities';
import { ICreateAnalyticsYoutubeInput } from './interfaces/create-analytics-youtube-input.interface';

@Injectable()
export class AnalyticsYoutubeRepository extends Repository<AnalyticsYoutube> {
  constructor(dataSource: DataSource) {
    super(AnalyticsYoutube, dataSource.createEntityManager());
  }
  async createAndSave(
    createAnalyticsYoutubeInput: ICreateAnalyticsYoutubeInput,
    queryRunner?: QueryRunner
  ): Promise<AnalyticsYoutube> {
    const newAnalyticsYoutube = this.create(createAnalyticsYoutubeInput);
    const queryResult = await this.createQueryBuilder(
      'analytics-youtube-createAndSave',
      queryRunner
    )
      .insert()
      .values(newAnalyticsYoutube)
      .returning('*')
      .execute();
    return queryResult.raw[0];
  }

  async findByUserId(userId: number, queryRunner?: QueryRunner) {
    const queryResult = await this.createQueryBuilder(
      'analytics_youtube',
      queryRunner
    )
      .innerJoin('analytics_youtube.integration', 'integration')
      .where('integration.userId = :userId', { userId })
      .getMany();

    console.log(queryResult);

    return queryResult;
  }

  async findByIntegrationId(integrationId: number, queryRunner?: QueryRunner) {
    const queryResult = await this.createQueryBuilder(
      'analytics_youtube',
      queryRunner
    )
      .where({ integrationId })
      .getOne();

    return queryResult;
  }
}
