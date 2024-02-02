import { Injectable } from '@nestjs/common';
import { ICreateCredentialInput } from '../interfaces/create-credential-input.interface';
import { CredentialRepository } from './credential.repository';
import { Credential } from 'src/entities';
import { QueryRunner } from 'typeorm';

@Injectable()
export class CredentialService {
  constructor(private readonly credentialRepository: CredentialRepository) {}

  async create(
    createCredentialInput: ICreateCredentialInput,
    queryRunner: QueryRunner
  ): Promise<Credential> {
    const newCredential = await this.credentialRepository.createAndSave(
      createCredentialInput,
      queryRunner
    );
    return newCredential;
  }

  async getAll() {
    const credentials = await this.credentialRepository.find();
    return credentials;
  }

  async getByIntegrationId(
    integrationId: number,
    queryRunner?: QueryRunner
  ): Promise<Credential> {
    const credential = await this.credentialRepository.findByIntegrationId(
      integrationId,
      queryRunner
    );
    return credential;
  }
}
