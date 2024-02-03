import { DataSource, Repository, QueryRunner } from 'typeorm';
import { Network } from 'src/entities';
export declare class NetworkRepository extends Repository<Network> {
    constructor(dataSource: DataSource);
    createAndSave(createNetworkInput: any, queryRunner?: QueryRunner): Promise<Network>;
    findById(id: number, queryRunner?: QueryRunner): Promise<Network>;
    findByUserId(userId: number, filter?: any, queryRunner?: QueryRunner): Promise<Network[]>;
    deleteNetwork(id: number, queryRunner?: QueryRunner): Promise<Network>;
}
