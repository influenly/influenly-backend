import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { YoutubeService } from 'src/libs/youtube/youtube.service';
import { CreateIntegrationDto } from './dto';
import { IntegrationRepository } from './integration.repository';
import { CredentialService } from './credential/credential.service';
import { NetworkService } from 'src/user/network/network.service';
import { AnalyticsService } from 'src/analytics/analytics.service';
import { Platforms } from 'src/common/constants/enums';
import { UserService } from 'src/user/user.service';

@Injectable()
export class IntegrationService {
  constructor(
    private readonly integrationRepository: IntegrationRepository,
    private readonly networkService: NetworkService,
    private readonly analyticsService: AnalyticsService,
    private readonly credentialService: CredentialService,
    private readonly youtubeService: YoutubeService,
    private readonly userService: UserService,
    private readonly dataSource: DataSource
  ) {}

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

      const user = await this.userService.getUserById(userId, true);

      const channelInfo = await this.youtubeService.getChannelInfo(accessToken);

      const userNetworks = user.networks;

      const integratedNetwork = userNetworks.find(
        (network) => network.integrated && network.channelId === channelInfo.id
      );

      if (integratedNetwork) {
        return {
          networkId: integratedNetwork.id,
          userId: integratedNetwork.userId
        };
      }

      const newNetwork = await this.networkService.create(
        {
          channelId: platform === Platforms.YOUTUBE ? channelInfo.id : null,
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

      await this.analyticsService.createBA(
        {
          integrationId,
          totalSubs: parseInt(totalSubs),
          totalVideos: parseInt(totalVideos)
        },
        queryRunner
      );

      await this.userService.updateById(user, {
        totalFollowers: (user.totalFollowers || 0) + parseInt(totalSubs)
      });

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

      return newIntegration;
    } catch (err) {
      Logger.error(`Integration creation transaction has failed.`);
      await queryRunner.rollbackTransaction();
      throw new Error(err.message);
    } finally {
      await queryRunner.release();
    }
  }
}
