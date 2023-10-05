import { DataSource, Repository, QueryRunner } from 'typeorm';
import { Integration } from 'src/entities';
import { ICreateIntegrationInput } from './interfaces';
export declare class IntegrationRepository extends Repository<Integration> {
    constructor(dataSource: DataSource);
    createAndSave(createIntegrationInput: ICreateIntegrationInput, queryRunner?: QueryRunner): Promise<Integration>;
    findByUserId(userId: number, queryRunner?: QueryRunner): Promise<Integration[]>;
    findByNetworkId(networkId: number, queryRunner?: QueryRunner): Promise<Integration>;
}
