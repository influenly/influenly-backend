import { DataSource, Repository, QueryRunner } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Profile } from 'src/entities';
import { ICreateProfileInput } from './interfaces/create-profile-input.interface';

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
}
