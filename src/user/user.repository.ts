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
    let queryBuilder: SelectQueryBuilder<User> = this.createQueryBuilder(
      'user'
    ).setParameters({ contentTagsArr: filter.contentTagsArr });

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

    queryBuilder.where(`ARRAY_LENGTH(ARRAY(
      SELECT UNNEST("user"."contentTags")
      INTERSECT
      SELECT UNNEST(:cc::text[])
      ), 1) IS NOT NULL`);

    // Aplica filtro de tags
    if (filter?.contentTagsArr?.length) {
      queryBuilder = queryBuilder.where('user.contentTags && :contentTagsArr', {
        contentTagsArr: filter.contentTagsArr
      });
    }

    // queryBuilder.leftJoinAndSelect(
    //   'user.networks',
    //   'network',
    //   filter?.integrated === undefined
    //     ? undefined
    //     : `network.integrated = ${filter.integrated}`
    // );
    // queryBuilder.leftJoinAndSelect('network.integration', 'integration');
    // queryBuilder.leftJoinAndSelect(
    //   'integration.analyticsYoutube',
    //   'analyticsYoutube'
    // );
    // queryBuilder
    //   .addSelect(
    //     'array(SELECT UNNEST(user.contentTags) INTERSECT array(:contentTagsArr))',
    //     'interseccion'
    //   )
    // .orderBy(
    //   'ARRAY_LENGTH(ARRAY(SELECT UNNEST(user.contentTags) INTERSECT ARRAY(:contentTagsArr)))',
    //   'DESC'
    // )
    // .setParameter('contentTagsArr', filter.contentTagsArr);

    //   let queryResult = await this.query(
    //     `
    // SELECT *
    // FROM "user"
    // LEFT JOIN "network" ON "user".id="network"."userId"
    // LEFT JOIN "integration" ON "network".id="integration"."networkId"
    // LEFT JOIN "analytics_youtube" ON "integration".id="analytics_youtube"."integrationId"

    // WHERE )

    // ORDER BY ARRAY_LENGTH(ARRAY(
    //     SELECT UNNEST("user"."contentTags")
    //     INTERSECT
    //     SELECT UNNEST($1::text[])
    // ),1) DESC`,[['hola', 'chau']]
    //   );

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
