import { Injectable } from '@nestjs/common';
import { AnalyticsYoutubeRepository } from './analytics-youtube/analytics-youtube.repository';
import { QueryRunner } from 'typeorm';
import { ICreateAnalyticsYoutubeInput } from './analytics-youtube/interfaces/create-analytics-youtube-input.interface';

@Injectable()
export class AnalyticsService {
  constructor(
    private readonly analyticsYoutubeRepository: AnalyticsYoutubeRepository
  ) {}

  async createBasicAnalytics(
    createAnalyticsYoutubeInput: ICreateAnalyticsYoutubeInput,
    queryRunner?: QueryRunner
  ) {
    const createdAnalyticsYoutube =
      await this.analyticsYoutubeRepository.createAndSave(
        createAnalyticsYoutubeInput,
        queryRunner
      );
    return createdAnalyticsYoutube;
  }

  async getBasicAnalyticsByUserId(userId: number, queryRunner?: QueryRunner) {
    const analyticsYoutube = await this.analyticsYoutubeRepository.findByUserId(
      userId,
      queryRunner
    );
    return analyticsYoutube;
  }

  async getBasicAnalyticsByIntegrationId(
    integrationId: number,
    queryRunner?: QueryRunner
  ) {
    const analyticsYoutube =
      await this.analyticsYoutubeRepository.findByIntegrationId(
        integrationId,
        queryRunner
      );
    return analyticsYoutube;
  }
}
