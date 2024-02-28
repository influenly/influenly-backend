import { Injectable } from '@nestjs/common';
import { User } from 'src/entities';
import {
  Repository,
  DataSource,
  QueryRunner,
  SelectQueryBuilder
} from 'typeorm';
import { ICreateUserInput, IUpdateUserInput } from './interfaces';

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

  async findAllCreators(filter?, queryRunner?: QueryRunner): Promise<User[]> {
    let queryBuilder: SelectQueryBuilder<User> =
      this.createQueryBuilder('user');

    // Aplica filtro de tags
    if (filter?.contentTagsArr?.length) {
      queryBuilder = queryBuilder.andWhere(
        'user.contentTags && :contentTagsArr',
        {
          contentTagsArr: filter.contentTagsArr
        }
      );
    }

    queryBuilder.leftJoinAndSelect(
      'user.networks',
      'network',
      filter?.integrated === undefined
        ? undefined
        : `network.integrated = ${filter.integrated}`
    );
    queryBuilder.leftJoinAndSelect('network.integration', 'integration');
    queryBuilder.leftJoinAndSelect(
      'integration.analyticsYoutube',
      'analyticsYoutube'
    );

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
    const queryResult = await this.createQueryBuilder('updateById', queryRunner)
      .update(updateUserInput)
      .where({
        id
      })
      .returning('*')
      .execute();

    return queryResult.raw[0];
  }
}
