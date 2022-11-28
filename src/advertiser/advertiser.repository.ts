import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Advertiser } from 'src/entities';
import { ICreateAdvertiserInput } from 'src/common/interfaces/advertiser';

@Injectable()
export class AdvertiserRepository extends Repository<Advertiser> {
  constructor(dataSource: DataSource) {
    super(Advertiser, dataSource.createEntityManager());
  }
  async createAndSave(
    createAdvertiserInput: ICreateAdvertiserInput
  ): Promise<Advertiser> {
    const newAdvertiser = this.create(createAdvertiserInput);
    await this.save(newAdvertiser);
    return newAdvertiser;
  }
}
