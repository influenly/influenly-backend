import { DataSource, Repository, QueryRunner } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Creator } from 'src/entities';
import { ICreateCreatorInput } from '../common/interfaces/creator';

@Injectable()
export class CreatorRepository extends Repository<Creator> {
  constructor(dataSource: DataSource) {
    super(Creator, dataSource.createEntityManager());
  }
  async createAndSave(
    createCreatorInput: ICreateCreatorInput,
    queryRunner?: QueryRunner
  ): Promise<Creator> {
    const newCreator = this.create(createCreatorInput);
    const queryResult = await this.createQueryBuilder(
      'createAndSave',
      queryRunner
    )
      .insert()
      .values(newCreator)
      .returning('*')
      .execute();
    return queryResult.raw[0];
  }

  async findById(id: number, queryRunner?: QueryRunner): Promise<Creator> {
    const queryResult = await this.createQueryBuilder('findById', queryRunner)
      .where({ id })
      .getOne();

    return queryResult;
  }
}
