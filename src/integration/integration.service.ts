import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Integration } from 'src/entities';
import { GoogleService } from 'src/libs/google/google.service';
import { CreateIntegrationDto } from './dto';
import { IntegrationRepository } from './integration.repository';
import { AnalyticsRepository } from 'src/analytics/analytics.repository';
import { AnalyticsYoutubeRepository } from 'src/analytics/analytics-youtube/analytics-youtube.repository';
import { Platforms } from 'src/common/constants/enums';

@Injectable()
export class IntegrationService {
  constructor(
    private readonly integrationRepository: IntegrationRepository,
    private readonly googleOAuth2Service: GoogleService,
    private readonly analyticsRepository: AnalyticsRepository,
    private readonly analyticsYoutubeRepository: AnalyticsYoutubeRepository,
    private readonly dataSource: DataSource
  ) {}

  async getIntegration(id: number): Promise<Integration> {
    const integration = await this.integrationRepository.findOne({
      where: { id }
    });
    return integration;
  }

  async createIntegration(
    userId: number,
    createIntegrationDto: CreateIntegrationDto
  ) {
    const { authorizationCode, platform } = createIntegrationDto;

    const analyticsPlatformMap = new Map();
    analyticsPlatformMap.set(Platforms.YOUTUBE, 'youtubeLinked');
    analyticsPlatformMap.set(Platforms.TIKTOK, 'tiktokLinked');

    const analyticsPlatformKey = analyticsPlatformMap.get(platform);

    const analytics = await this.analyticsRepository.findByUserId(userId);

    if (analytics[analyticsPlatformKey])
      throw new Error(`User already has integration for ${platform}`);

    const analyticsId = analytics.id;

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const {
        access_token: accessToken,
        expiry_date: expiryDate,
        id_token: idToken,
        refresh_token: refreshToken
      } = await this.googleOAuth2Service.getToken(authorizationCode);

      const newIntegration = await this.integrationRepository.createAndSave(
        {
          accessToken,
          expiryDate,
          idToken,
          refreshToken
        },
        queryRunner
      );

      const integrationId = newIntegration.id;

      switch (createIntegrationDto.platform) {
        case Platforms.YOUTUBE:
          await this.analyticsYoutubeRepository.createAndSave(
            {
              analyticsId,
              integrationId
            },
            queryRunner
          );
          break;

        case Platforms.TIKTOK:
          Logger.log('analytics tiktok...');
          break;

        default:
          throw new Error('Invalid Platform');
      }

      await this.analyticsRepository.updateById(
        analyticsId,
        {
          [analyticsPlatformKey]: true
        },
        queryRunner
      );

      await queryRunner.commitTransaction();

      return {};
    } catch (err) {
      Logger.error(`Integration creation transaction has failed.`);
      await queryRunner.rollbackTransaction();
      throw new Error(err.message);
    } finally {
      await queryRunner.release();
    }
  }
}
