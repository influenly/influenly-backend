import { ICreateCredentialInput } from '../interfaces/create-credential-input.interface';
import { CredentialRepository } from './credential.repository';
import { Credential } from 'src/entities';
import { QueryRunner } from 'typeorm';
export declare class CredentialService {
    private readonly credentialRepository;
    constructor(credentialRepository: CredentialRepository);
    create(createCredentialInput: ICreateCredentialInput, queryRunner: QueryRunner): Promise<Credential>;
    getAll(): Promise<Credential[]>;
    getByIntegrationId(integrationId: number, queryRunner?: QueryRunner): Promise<Credential>;
}
