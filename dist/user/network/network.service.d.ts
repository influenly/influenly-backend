import { Network } from 'src/entities';
import { QueryRunner } from 'typeorm';
import { NetworkRepository } from './network.repository';
export declare class NetworkService {
    private readonly networkRepository;
    constructor(networkRepository: NetworkRepository);
    create(createNetworkInput: any, queryRunner?: QueryRunner): Promise<Network>;
    getById(id: number, queryRunner?: QueryRunner): Promise<Network>;
    getByUserId(userId: number, filter?: any, queryRunner?: QueryRunner): Promise<Network[]>;
    deleteNetwork(id: number, queryRunner?: QueryRunner): Promise<Network>;
}
