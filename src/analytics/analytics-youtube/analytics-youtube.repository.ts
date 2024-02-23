import { DataSource, Repository, QueryRunner } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { AnalyticsYoutube } from 'src/entities';
import { ICreateBAYoutubeInput, IUpdateBAYoutubeInput } from './interfaces';
import { NumberSchema } from 'joi';

@Injectable()
export class AnalyticsYoutubeRepository extends Repository<AnalyticsYoutube> {
  constructor(dataSource: DataSource) {
    super(AnalyticsYoutube, dataSource.createEntityManager());
  }
  async createAndSave(
    createAnalyticsYoutubeInput: ICreateBAYoutubeInput,
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

    return queryResult;
  }

  async findByIntegrationId(integrationId: number, queryRunner?: QueryRunner) {
    // should check/return in redis cache
    const queryResult = await this.createQueryBuilder(
      'analytics_youtube',
      queryRunner
    )
      .where({ integrationId })
      .getOne();

    return queryResult;
  }

  async updateByIntegrationId(
    integrationId: number,
    udateBAYoutubeInput: IUpdateBAYoutubeInput,
    queryRunner?: QueryRunner
  ) {
    const queryResult = await this.createQueryBuilder(
      'analytics_youtube',
      queryRunner
    )
      .update(udateBAYoutubeInput)
      .where({ integrationId })
      .returning('*')
      .execute();

    return queryResult;
  }

  async getBAByUserIds(userIds: number[], queryRunner?: QueryRunner) {
    const queryResult = await this.createQueryBuilder(
      'analytics_youtube',
      queryRunner
    )
      .leftJoinAndSelect('analytics_youtube.integration', 'integration')
      .leftJoinAndSelect('integration.network', 'network')
      .where('network.userId IN (:...userIds)', { userIds })
      .getMany();

    return queryResult;
  }
}
