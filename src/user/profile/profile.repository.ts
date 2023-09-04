import { DataSource, Repository, QueryRunner } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Profile } from 'src/entities';
import { ICreateProfileInput } from './interfaces/create-profile-input.interface';
import { IUpdateProfileInput } from './interfaces/update-profile-input.interface';

@Injectable()
export class ProfileRepository extends Repository<Profile> {
  constructor(dataSource: DataSource) {
    super(Profile, dataSource.createEntityManager());
  }
  async createAndSave(
    createProfileInput: ICreateProfileInput,
    queryRunner?: QueryRunner
  ): Promise<Profile> {
    const newProfile = this.create(createProfileInput);
    const queryResult = await this.createQueryBuilder(
      'profile-createAndSave',
      queryRunner
    )
      .insert()
      .values(newProfile)
      .returning('*')
      .execute();
    return queryResult.raw[0];
  }

  // async findByUserId(
  //   userId: number,
  //   queryRunner?: QueryRunner
  // ): Promise<Profile> {
  // const queryResult = await this.createQueryBuilder('profile')
  //     .leftJoin('profile.user', 'user')
  //     .addSelect(['user.type', 'user.country'])
  //     .where('user.id = :userId', { userId })
  //     .getOne();

  //   return queryResult;
  // }

  async updateByUserId(
    id: number,
    updateProfileInput: IUpdateProfileInput,
    queryRunner?: QueryRunner
  ): Promise<Profile> {
    const queryResult = await this.createQueryBuilder(
      'profile-updateById',
      queryRunner
    )
      .update(updateProfileInput)
      .where({
        userId: id
      })
      .returning('*')
      .execute();

    return queryResult.raw[0];
  }
}
