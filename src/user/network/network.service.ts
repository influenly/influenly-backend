import { Injectable } from '@nestjs/common';
import { Network } from 'src/entities';
import { QueryRunner } from 'typeorm';
import { NetworkRepository } from './network.repository';
import { ICreateNetworkInput } from './interfaces/create-network.interface';

@Injectable()
export class NetworkService {
  constructor(private readonly networkRepository: NetworkRepository) {}

  async create(createNetworkInput, queryRunner: QueryRunner): Promise<Network> {
    const newNetwork = await this.networkRepository.createAndSave(
      createNetworkInput,
      queryRunner
    );
    return newNetwork;
  }

  async getById(id: number, queryRunner?: QueryRunner): Promise<Network> {
    const network = await this.networkRepository.findById(id, queryRunner);
    return network;
  }

  async getByUserId(
    userId: number,
    queryRunner?: QueryRunner
  ): Promise<Network[]> {
    const networks = await this.networkRepository.findByUserId(
      userId,
      queryRunner
    );
    return networks;
  }
}
