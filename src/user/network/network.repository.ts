import { DataSource, Repository, QueryRunner } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Network } from 'src/entities';

@Injectable()
export class NetworkRepository extends Repository<Network> {
  constructor(dataSource: DataSource) {
    super(Network, dataSource.createEntityManager());
  }
  async createAndSave(
    createNetworkInput,
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

  async findById(id: number, queryRunner?: QueryRunner): Promise<Network> {
    const queryResult = await this.createQueryBuilder('network', queryRunner)
      .where({ id })
      .getOne();

    return queryResult;
  }

  async findByUserId(
    userId: number,
    queryRunner?: QueryRunner
  ): Promise<Network[]> {
    const queryResult = await this.createQueryBuilder('network', queryRunner)
      .where({ userId })
      .getMany();

    return queryResult;
  }

  // async updateByUserId(
  //   userId: number,
  //   updateNetworksInput,
  //   queryRunner?: QueryRunner
  // ): Promise<Network[]> {
  //   const queryResult = await this.createQueryBuilder('network', queryRunner)
  //     .update(updateNetworksInput)
  //     .where({ userId })
  //     .returning('*')
  //     .execute();

  //   return queryResult.raw[0];
  // }
}
