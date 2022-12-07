import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Integration } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateIntegrationDto, UpdateIntegrationDto } from './dto';

@Injectable()
export class IntegrationService {
  constructor(
    @InjectRepository(Integration)
    private readonly integrationRepository: Repository<Integration>
  ) {}
  async getAllIntegration(): Promise<Integration[]> {
    const integration = await this.integrationRepository.find();
    return integration;
  }

  async getIntegration(id: number): Promise<Integration> {
    const integration = await this.integrationRepository.findOne({
      where: { id }
    });
    return integration;
  }

  async createIntegration(
    createTokenInfoDto: CreateIntegrationDto
  ): Promise<Integration> {
    const newIntegration =
      this.integrationRepository.create(createTokenInfoDto);
    await this.integrationRepository.save(newIntegration);
    return newIntegration;
  }

  async updateIntegration(
    updateTokenInfoDto: UpdateIntegrationDto
  ): Promise<Integration> {
    const queryResult = await this.integrationRepository
      .createQueryBuilder()
      .update(updateTokenInfoDto)
      .where({
        id: updateTokenInfoDto.id
      })
      .returning('*')
      .execute();

    return queryResult.raw[0];
  }

  async deleteIntegration(id: number): Promise<Integration> {
    const queryResult = await this.integrationRepository
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
