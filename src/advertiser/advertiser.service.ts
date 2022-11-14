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
  getAdvertisers(): string {
    return 'Get advertisers!';
  }

  getAdvertiser(id: string): string {
    return `Get advertiser with id ${id}!`;
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

  deleteAdvertiser(id: string): string {
    return `Delete advertiser with id ${id}!`;
  }
}
