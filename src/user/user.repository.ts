import { Injectable } from '@nestjs/common';
import { User } from 'src/entities';
import {
  Repository,
  DataSource,
  QueryRunner,
  SelectQueryBuilder
} from 'typeorm';
import { ICreateUserInput } from './interfaces';
import { IFindAllCreatorsFilters } from './interfaces/find-all-creators-filters';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }
  async createAndSave(
    createUserInput: ICreateUserInput,
    queryRunner?: QueryRunner
  ): Promise<User> {
    const newUser = this.create(createUserInput);
    const queryResult = await this.createQueryBuilder(
      'user-createAndSave',
      queryRunner
    )
      .insert()
      .values(newUser)
      .returning('*')
      .execute();
    return queryResult.raw[0];
  }

  async findAllCreators(
    filters: IFindAllCreatorsFilters,
    orderBy,
    queryRunner?: QueryRunner
  ): Promise<User[]> {
    let queryBuilder: SelectQueryBuilder<User> =
      this.createQueryBuilder('user');

    queryBuilder.leftJoinAndSelect(
      'user.networks',
      'network',
      filters.integrated.active
        ? `network.integrated = ${filters.integrated.value}`
        : undefined
    );

    // Aplica filtro de tags
    if (filters.contentTags.active) {
      queryBuilder = queryBuilder.andWhere(
        'user.contentTags && :contentTagsParam',
        {
          contentTagsParam: filters.contentTags.value
        }
      );
    }

    // Aplica filtro de followers
    if (filters.followersRange.active) {
      if (filters.followersRange.value.maxFollowers === Infinity) {
        queryBuilder = queryBuilder.andWhere(
          'user.totalFollowers >= :minFollowersParam',
          {
            minFollowersParam: filters.followersRange.value.minFollowers
          }
        );
      } else {
        queryBuilder = queryBuilder.andWhere(
          'user.totalFollowers >= :minFollowersParam AND user.totalFollowers <= :maxFollowersParam',
          {
            minFollowersParam: filters.followersRange.value.minFollowers,
            maxFollowersParam: filters.followersRange.value.maxFollowers
          }
        );
      }
    }

    if (orderBy === 'ORDER_BY_FOLLOWERS') {
      queryBuilder.orderBy('user.totalFollowers', 'DESC');
    }

    // TODO tomar en cuenta los tags del anunciante que hace la req para determinar relevancia

    if (orderBy === 'ORDER_BY_RELEVANCE') {
      queryBuilder.orderBy(
        `ARRAY_LENGTH(ARRAY(
        SELECT UNNEST("user"."contentTags")
        INTERSECT
        SELECT UNNEST(:contentTagsParam::text[])
    ),1)`,
        'DESC'
      );
    }

    queryBuilder.andWhere("user.type = 'CREATOR'");

    const queryResult = await queryBuilder.getMany();

    return queryResult;
  }

  async findById(
    id: number,
    withNetworksInfo: Boolean,
    queryRunner?: QueryRunner
  ): Promise<User> {
    let queryBuilder = await this.createQueryBuilder('user', queryRunner);

    if (withNetworksInfo) {
      queryBuilder.leftJoinAndSelect('user.networks', 'network');
      queryBuilder.leftJoinAndSelect('network.integration', 'integration');
      queryBuilder.leftJoinAndSelect(
        'integration.analyticsYoutube',
        'analyticsYoutube'
      );
    }

    queryBuilder.where({ id });

    const queryResult = await queryBuilder.getOne();

    return queryResult;
  }

  async findByEmail(email: string, queryRunner?: QueryRunner): Promise<User> {
    const queryResult = await this.createQueryBuilder(
      'findByEmail',
      queryRunner
    )
      .where({ email })
      .getOne();

    return queryResult;
  }

  async updateById(
    id: number,
    updateUserInput,
    queryRunner?: QueryRunner
  ): Promise<User> {
    const queryResult = await this.createQueryBuilder('user', queryRunner)
      .update(updateUserInput)
      .where({
        id
      })
      .returning('*')
      .execute();

    return queryResult.raw[0];
  }
}
