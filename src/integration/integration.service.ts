import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Integration } from 'src/entities';
import { GoogleService } from 'src/libs/google/google.service';
import { CreateIntegrationDto } from './dto';
import { IntegrationRepository } from './integration.repository';
import { AnalyticsRepository } from 'src/analytics/analytics.repository';
import { AnalyticsYoutubeRepository } from 'src/analytics/analytics-youtube/analytics-youtube.repository';
import { UserRepository } from '../user/user.repository';

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
      const authorizationCode = createIntegrationDto.authorizationCode;

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

      const newAnalyticsYoutube =
        await this.analyticsYoutubeRepository.createAndSave(
          {
            integrationId
          },
          queryRunner
        );

      const analyticsYoutubeId = newAnalyticsYoutube.id;

      const newAnalytics = await this.analyticsRepository.createAndSave(
        {
          analyticsYoutubeId
        },
        queryRunner
      );

      const analyticsId = newAnalytics.id;

      await this.userRepository.updateById(userId, {
        analyticsId
      });

      await queryRunner.commitTransaction();

      return {
        userId,
        analyticsId,
        analyticsYoutubeId,
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
