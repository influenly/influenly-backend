import { DataSource, Repository, QueryRunner } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Integration } from 'src/entities';
import { ICreateIntegrationInput } from 'src/common/interfaces/integration';

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
      'createAndSave',
      queryRunner
    )
      .insert()
      .values(newIntegration)
      .returning('*')
      .execute();
    return queryResult.raw[0];
  }

  //   async findById(id: number, queryRunner?: QueryRunner): Promise<Creator> {
  //     const queryResult = await this.createQueryBuilder('findById', queryRunner)
  //       .where({ id })
  //       .getOne();

  //     return queryResult;
  //   }

  //   async findByUserId(
  //     userId: number,
  //     queryRunner?: QueryRunner
  //   ): Promise<Integration> {
  //     const queryResult = await this.createQueryBuilder(
  //       'findByUserId',
  //       queryRunner
  //     )
  //       .where({ userId })
  //       .getOne();

  //     return queryResult;
  //   }
}
