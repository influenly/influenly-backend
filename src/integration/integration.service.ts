import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreatorRepository } from 'src/creator/creator.repository';
import { Integration } from 'src/entities';
import { GoogleService } from 'src/libs/google/google.service';
import { CreateIntegrationDto } from './dto';
import { IntegrationRepository } from './integration.repository';
import { Platforms } from 'src/common/constants/enums';
import { AnalyticsRepository } from 'src/analytics/analytics.repository';

@Injectable()
export class IntegrationService {
  constructor(
    private readonly integrationRepository: IntegrationRepository,
    private readonly googleOAuth2Service: GoogleService,
    private readonly creatorRepository: CreatorRepository,
    private readonly analyticsRepository: AnalyticsRepository,
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
      const creator = await this.creatorRepository.findByUserId(
        userId,
        queryRunner
      );

      if (!creator)
        throw new Error(`Creator not found with given user id ${userId}`);

      //TODO: token getting

      // const token = this.googleOAuth2Service.getToken(
      //   createIntegrationDto.authorizationCode
      // );

      const platform =
        Platforms[createIntegrationDto.platform as keyof typeof Platforms];

      const newIntegration = await this.integrationRepository.createAndSave(
        {
          accessToken: 'example',
          tokenExpiresIn: 123123123,
          refreshToken: 'examplee',
          platform
        },
        queryRunner
      );

      const newAnalytics = await this.analyticsRepository.createAndSave(
        {
          creatorId: creator.id,
          integrationId: newIntegration.id,
          platform
        },
        queryRunner
      );

      await queryRunner.commitTransaction();

      return {
        userId,
        creatorId: creator.id,
        integrationId: newIntegration.id,
        analyticsId: newAnalytics.id
      };
    } catch (err) {
      Logger.error(`Integration creation transaction has failed.`);
      await queryRunner.rollbackTransaction();
      throw new Error(err.message);
    } finally {
      await queryRunner.release();
    }
    //analyze token response and build input
    //const integrationInput = {
    //...token
    // };
    //create analytics ( empty )
    //create integration
    // const newIntegration =
    //   this.integrationRepository.create(createTokenInfoDto);
    // await this.integrationRepository.save(newIntegration);
    // return newIntegration;

    return 1;
  }
}
