import { Injectable, Logger } from '@nestjs/common';
import { DataSource, QueryRunner } from 'typeorm';
import { Credential, Integration } from 'src/entities';
import { YoutubeService } from 'src/libs/youtube/youtube.service';
import { CreateIntegrationDto } from './dto';
import { IntegrationRepository } from './integration.repository';
import { CredentialService } from './credential/credential.service';
import { NetworkService } from 'src/user/network/network.service';
import { AnalyticsService } from 'src/analytics/analytics.service';

@Injectable()
export class IntegrationService {
  constructor(
    private readonly integrationRepository: IntegrationRepository,
    private readonly networkService: NetworkService,
    private readonly analyticsService: AnalyticsService,
    private readonly credentialService: CredentialService,
    private readonly youtubeService: YoutubeService,
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

  async getByNetworkId(
    networkId: number,
    queryRunner?: QueryRunner
  ): Promise<Integration> {
    const integration = await this.integrationRepository.findByNetworkId(
      networkId,
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

      if (scope.split(' ').length !== 2)
        throw new Error(
          'Both permission should be accepted to create integration'
        );

      const channelInfo = await this.youtubeService.getChannelInfo(accessToken);

      const userNetworks = await this.networkService.getByUserId(userId);

      const isIntegrated = (network) =>
        network.integrated && network.channelId === channelInfo.id;

      if (userNetworks.some(isIntegrated)) {
        throw new Error('Network already integrated');
      }

      const newNetwork = await this.networkService.create(
        {
          channelId: channelInfo.id,
          name: channelInfo.name,
          platform,
          integrated: true,
          profileImg: channelInfo.profileImg,
          url: `https://www.youtube.com/channel/${channelInfo.id}`,
          userId
        },
        queryRunner
      );

      const networkId = newNetwork.id;

      const newIntegration = await this.integrationRepository.createAndSave(
        {
          networkId,
          userId
        },
        queryRunner
      );

      const integrationId = newIntegration.id;

      const { totalSubs, totalVideos } = channelInfo;

      await this.analyticsService.createBasicAnalytics(
        {
          integrationId,
          totalSubs: parseInt(totalSubs),
          totalVideos: parseInt(totalVideos)
        },
        queryRunner
      );

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
        networkIntegratedId: newNetwork.id,
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
