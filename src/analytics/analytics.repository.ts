import { DataSource, Repository, QueryRunner } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Analytics } from 'src/entities';
import {
  ICreateAnalyticsInput,
  IUpdateAnalyticsInput
} from 'src/common/interfaces/analytics';

@Injectable()
export class AnalyticsRepository extends Repository<Analytics> {
  constructor(dataSource: DataSource) {
    super(Analytics, dataSource.createEntityManager());
  }
  async createAndSave(
    createAnalyticsInput: ICreateAnalyticsInput,
    queryRunner?: QueryRunner
  ): Promise<Analytics> {
    const newAnalytics = this.create(createAnalyticsInput);
    const queryResult = await this.createQueryBuilder(
      'analytics-createAndSave',
      queryRunner
    )
      .insert()
      .values(newAnalytics)
      .returning('*')
      .execute();
    return queryResult.raw[0];
  }

  async updateById(
    id: number,
    updateAnalyticsInput: IUpdateAnalyticsInput,
    queryRunner?: QueryRunner
  ): Promise<Analytics> {
    const queryResult = await this.createQueryBuilder('updateById', queryRunner)
      .update(updateAnalyticsInput)
      .where({
        id
      })
      .returning('*')
      .execute();

    return queryResult.raw[0];
  }

  async findById(id: number, queryRunner?: QueryRunner): Promise<Analytics> {
    const queryResult = await this.createQueryBuilder(
      'analytics-findById',
      queryRunner
    )
      .where({ id })
      .getOne();

    return queryResult;
  }

  async findByUserId(
    id: number,
    queryRunner?: QueryRunner
  ): Promise<Analytics> {
    const queryResult = await this.createQueryBuilder(
      'analytics-findById',
      queryRunner
    )
      .where({ userId: id })
      .getOne();

    return queryResult;
  }
}
