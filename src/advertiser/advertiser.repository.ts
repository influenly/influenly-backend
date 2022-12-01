import { DataSource, Repository, QueryRunner } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Advertiser } from 'src/entities';
import { ICreateAdvertiserInput } from 'src/common/interfaces/advertiser';

@Injectable()
export class AdvertiserRepository extends Repository<Advertiser> {
  constructor(dataSource: DataSource) {
    super(Advertiser, dataSource.createEntityManager());
  }
  async createAndSave(
    createAdvertiserInput: ICreateAdvertiserInput,
    queryRunner?: QueryRunner
  ): Promise<Advertiser> {
    const newAdvertiser = this.create(createAdvertiserInput);

    const queryResult = await this.createQueryBuilder(
      'createAndSave',
      queryRunner
    )
      .insert()
      .values(newAdvertiser)
      .returning('*')
      .execute();
    return queryResult.raw[0];
  }
}
