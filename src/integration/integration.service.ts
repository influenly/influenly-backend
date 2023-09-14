import { Injectable, Logger } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { Credential, Integration } from 'src/entities';
import { YoutubeService } from 'src/libs/youtube/youtube.service';
import { CreateIntegrationDto } from './dto';
import { IntegrationRepository } from './integration.repository';
import { AnalyticsRepository } from 'src/analytics/analytics.repository';
import { AnalyticsYoutubeRepository } from 'src/analytics/analytics-youtube/analytics-youtube.repository';
import { Platforms } from 'src/common/constants/enums';
import { CredentialService } from './credential/credential.service';

@Injectable()
export class IntegrationService {
  constructor(
    private readonly integrationRepository: IntegrationRepository,
    private readonly credentialService: CredentialService,
    private readonly youtubeService: YoutubeService,
    private readonly analyticsRepository: AnalyticsRepository,
    private readonly analyticsYoutubeRepository: AnalyticsYoutubeRepository,
    private readonly dataSource: DataSource
  ) {}

  async getByUserId(
    userId: number,
    queryRunner?: QueryRunner
  ): Promise<Integration[]> {
    const integration = await this.integrationRepository.findByUserId(
      userId,
      queryRunner
    );
    return integration;
  }

  async getCredentialByIntegrationId(
    integrationId: number,
    queryRunner?: QueryRunner
  ): Promise<Credential> {
    const credential = await this.credentialService.getByIntegrationId(
      integrationId,
      queryRunner
    );
    return credential;
  }

  async createIntegration(
    userId: number,
    createIntegrationDto: CreateIntegrationDto
  ) {
    const { authorizationCode, platform } = createIntegrationDto;

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const {
        access_token: accessToken,
        expiry_date: expiryDate,
        id_token: idToken,
        scope,
        refresh_token: refreshToken
      } = await this.youtubeService.getToken(authorizationCode);

      const newIntegration = await this.integrationRepository.createAndSave(
        {
          userId,
          platform
        },
        queryRunner
      );

      const integrationId = newIntegration.id;

      const newCredential = await this.credentialService.create(
        {
          integrationId,
          accessToken,
          expiryDate,
          idToken,
          scope,
          refreshToken
        },
        queryRunner
      );

      await queryRunner.commitTransaction();

      Logger.log(
        `Integration id: ${newIntegration.id} and Credential id: ${newCredential.id} created successfully`
      );

      return {
        error: false,
        message: 'Integration created successfully'
      };
    } catch (err) {
      console.log(err);
      Logger.error(`Integration creation transaction has failed.`);
      await queryRunner.rollbackTransaction();
      throw new Error(err.message);
    } finally {
      await queryRunner.release();
    }
  }
}
