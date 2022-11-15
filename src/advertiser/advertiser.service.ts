import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Advertiser } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateAdvertiserDto, UpdateAdvertiserDto } from './dto';
@Injectable()
export class AdvertiserService {
  constructor(
    @InjectRepository(Advertiser)
    private readonly advertiserRepository: Repository<Advertiser>
  ) {}
  async getAdvertisers(): Promise<Advertiser[]> {
    const advertisers = await this.advertiserRepository.find();
    return advertisers;
  }

  async getAdvertiser(id: number): Promise<Advertiser> {
    const advertiser = await this.advertiserRepository.findOne({
      where: { id }
    });
    return advertiser;
  }

  async createAdvertiser(
    createAdvertiserDto: CreateAdvertiserDto
  ): Promise<Advertiser> {
    const newAdvertiser = this.advertiserRepository.create(createAdvertiserDto);
    await this.advertiserRepository.save(newAdvertiser);
    return newAdvertiser;
  }

  async updateAdvertiser(
    updateAdvertiserDto: UpdateAdvertiserDto
  ): Promise<Advertiser> {
    const queryResult = await this.advertiserRepository
      .createQueryBuilder()
      .update(updateAdvertiserDto)
      .where({
        id: updateAdvertiserDto.id
      })
      .returning('*')
      .execute();

    return queryResult.raw[0];
  }

  async deleteAdvertiser(id: number): Promise<Advertiser> {
    const queryResult = await this.advertiserRepository
      .createQueryBuilder()
      .delete()
      .where({
        id
      })
      .returning('*')
      .execute();

    return queryResult.raw[0];
  }
}
