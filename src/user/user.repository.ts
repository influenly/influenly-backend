import { Injectable } from '@nestjs/common';
import { User } from 'src/entities';
import {
  Repository,
  DataSource,
  QueryRunner,
  SelectQueryBuilder
} from 'typeorm';
import { ICreateUserInput, IUpdateUserInput } from './interfaces';
import { UserTypes } from 'src/common/constants';

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
    // Ordena segun cantidad de tags coincidentes
    if (contentTagsArr && contentTagsArr.length) {
      queryBuilder = queryBuilder.andWhere(
        'user.content_tags && :contentTagsArr',
        {
          contentTagsArr
        }
      );
      if (contentTagsArr.length > 1) {
        queryBuilder = queryBuilder.addOrderBy(
          `array_length(ARRAY(SELECT unnest(user.content_tags) INTERSECT :contentTagsArr), 1)`,
          'DESC'
        );
      }
    }

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
    updateUserInput: IUpdateUserInput,
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
