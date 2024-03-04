import { DataSource, Repository, QueryRunner } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Credential } from 'src/entities';
import { ICreateCredentialInput } from '../interfaces';

@Injectable()
export class CredentialRepository extends Repository<Credential> {
  constructor(dataSource: DataSource) {
    super(Credential, dataSource.createEntityManager());
  }
  async createAndSave(
    createCredentialInput: ICreateCredentialInput,
    queryRunner: QueryRunner
  ): Promise<Credential> {
    const newCredential = this.create(createCredentialInput);
    const queryResult = await this.createQueryBuilder(
      'credential-createAndSave',
      queryRunner
    )
      .insert()
      .values(newCredential)
      .returning('*')
      .execute();
    return queryResult.raw[0];
  }

  async findByIntegrationId(integrationId: number, queryRunner?: QueryRunner) {
    const queryResult = await this.createQueryBuilder('credential', queryRunner)
      .where({ integrationId })
      .getOne();

    return queryResult;
  }
}
