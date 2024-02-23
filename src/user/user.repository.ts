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
    const { contentTagsArr } = filter;

    let queryBuilder: SelectQueryBuilder<User> =
      this.createQueryBuilder('user');

    // Aplica filtro de tags
    if (contentTagsArr?.length) {
      queryBuilder = queryBuilder.andWhere(
        'user.contentTags && :contentTagsArr',
        {
          contentTagsArr
        }
      );
    }
    // queryBuilder.innerJoin('u')
    // if (contentTagsArr.length > 1) {
    //   queryBuilder = queryBuilder
    //     .addOrderBy(
    //       `array_length(ARRAY(SELECT public.unnest(user.contentTags) INTERSECT SELECT public.unnest(:contentTagsArr)), 1)`,
    //       'DESC'
    //     )
    //     .setParameter('contentTagsArr', contentTagsArr);
    // }
    queryBuilder.leftJoinAndSelect('user.networks', 'networks');
    queryBuilder.leftJoinAndSelect('networks.integration', 'integration');
    queryBuilder.leftJoinAndSelect(
      'integration.analyticsYoutube',
      'analyticsYoutube'
    );

    const queryResult = await queryBuilder.getMany();

    return queryResult;
  }

  async findById(id: number, queryRunner?: QueryRunner): Promise<User> {
    const queryResult = await this.createQueryBuilder('findById', queryRunner)
      .where({ id })
      .getOne();

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
