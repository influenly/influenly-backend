import { DataSource, Repository, QueryRunner } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Integration } from 'src/entities';
import { ICreateIntegrationInput } from './interfaces';

@Injectable()
export class IntegrationRepository extends Repository<Integration> {
  constructor(dataSource: DataSource) {
    super(Integration, dataSource.createEntityManager());
  }
  async createAndSave(
    createIntegrationInput: ICreateIntegrationInput,
    queryRunner?: QueryRunner
  ): Promise<Integration> {
    const newIntegration = this.create(createIntegrationInput);
    const queryResult = await this.createQueryBuilder(
      'integration-createAndSave',
      queryRunner
    )
      .insert()
      .values(newIntegration)
      .returning('*')
      .execute();
    return queryResult.raw[0];
  }

  async findByUserId(userId: number, queryRunner?: QueryRunner) {
    const queryResult = await this.createQueryBuilder(
      'integration',
      queryRunner
    )
      .where({ userId })
      .getMany();

    console.log(queryResult);

    return queryResult;
  }

  async findByNetworkId(networkId: number, queryRunner?: QueryRunner) {
    const queryResult = await this.createQueryBuilder(
      'integration',
      queryRunner
    )
      .where({ networkId })
      .getOne();

    return queryResult;
  }
}
