import {
  DataSource,
  Repository,
  QueryRunner,
  SelectQueryBuilder
} from 'typeorm';
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
    filter?,
    queryRunner?: QueryRunner
  ): Promise<Network[]> {
    let queryBuilder: SelectQueryBuilder<Network> =
      this.createQueryBuilder('user');

    queryBuilder = queryBuilder.where({
      userId
    });

    if (filter?.integrated !== undefined) {
      queryBuilder = queryBuilder.andWhere({
        integrated: filter.integrated
      });
    }

    const queryResult = await queryBuilder.getMany();

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

  async deleteNetwork(id: number, queryRunner?: QueryRunner): Promise<Network> {
    const queryResult = await this.createQueryBuilder()
      .delete()
      .where({
        id
      })
      .returning('*')
      .execute();

    return queryResult.raw[0];
  }
}
