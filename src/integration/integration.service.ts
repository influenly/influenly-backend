import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Integration } from 'src/entities';
import { GoogleService } from 'src/libs/google/google.service';
import { CreateIntegrationDto } from './dto';
import { IntegrationRepository } from './integration.repository';
import { AnalyticsRepository } from 'src/analytics/analytics.repository';
import { AnalyticsYoutubeRepository } from 'src/analytics/analytics-youtube/analytics-youtube.repository';
import { UserRepository } from '../user/user.repository';
import { Platforms } from 'src/common/constants/enums';

@Injectable()
export class IntegrationService {
  constructor(
    private readonly integrationRepository: IntegrationRepository,
    private readonly googleOAuth2Service: GoogleService,
    private readonly analyticsRepository: AnalyticsRepository,
    private readonly analyticsYoutubeRepository: AnalyticsYoutubeRepository,
    private readonly userRepository: UserRepository,
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
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { authorizationCode, analyticsId } = createIntegrationDto;

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

      let newPlatformAnalytics;

      switch (createIntegrationDto.platform) {
        case Platforms.YOUTUBE:
          newPlatformAnalytics =
            await this.analyticsYoutubeRepository.createAndSave(
              {
                integrationId
              },
              queryRunner
            );
          break;

        case Platforms.TIKTOK:
          newPlatformAnalytics = 'analytics tiktok...';
          break;

        default:
          throw new Error('Invalid Platform');
      }

      const newPlatformAnalyticsId = newPlatformAnalytics.id;

      const analyticsMap = new Map();
      analyticsMap.set(Platforms.YOUTUBE, 'analyticsYoutubeId');
      analyticsMap.set(Platforms.TIKTOK, 'analyticsTiktokId');

      const newPlatformAnalyticsIdKey = analyticsMap.get(
        createIntegrationDto.platform
      );

      await this.analyticsRepository.updateById(
        analyticsId,
        {
          [newPlatformAnalyticsIdKey]: newPlatformAnalyticsId
        },
        queryRunner
      );

      await queryRunner.commitTransaction();

      return {
        userId,
        analyticsId,
        [newPlatformAnalyticsIdKey]: newPlatformAnalyticsId,
        integrationId
      };
    } catch (err) {
      Logger.error(`Integration creation transaction has failed.`);
      await queryRunner.rollbackTransaction();
      throw new Error(err.message);
    } finally {
      await queryRunner.release();
    }
  }
}
