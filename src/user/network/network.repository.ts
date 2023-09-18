import { DataSource, Repository, QueryRunner } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Network } from 'src/entities';
import { ICreateNetworkInput } from './interfaces/create-network.interface';

@Injectable()
export class NetworkRepository extends Repository<Network> {
  constructor(dataSource: DataSource) {
    super(Network, dataSource.createEntityManager());
  }
  async createAndSave(
    createNetworkInput: ICreateNetworkInput,
    queryRunner?: QueryRunner
  ): Promise<Network> {
    const newNetwork = this.create(createNetworkInput);
    const queryResult = await this.createQueryBuilder(
      'network-createAndSave',
      queryRunner
    )
      .insert()
      .values(newNetwork)
      .returning('*')
      .execute();
    return queryResult.raw[0];
  }

  async findByUserId(userId: number, queryRunner?: QueryRunner) {
    const queryResult = await this.createQueryBuilder('network', queryRunner)
      .where({ userId })
      .getMany();

    return queryResult;
  }
}
