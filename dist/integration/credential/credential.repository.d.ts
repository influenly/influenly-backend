import { DataSource, Repository, QueryRunner } from 'typeorm';
import { Credential } from 'src/entities';
import { ICreateCredentialInput } from '../interfaces';
export declare class CredentialRepository extends Repository<Credential> {
    constructor(dataSource: DataSource);
    createAndSave(createCredentialInput: ICreateCredentialInput, queryRunner: QueryRunner): Promise<Credential>;
    findByIntegrationId(integrationId: number, queryRunner?: QueryRunner): Promise<Credential>;
}
