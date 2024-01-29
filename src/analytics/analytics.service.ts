import { Injectable } from '@nestjs/common';
import { AnalyticsYoutubeRepository } from './analytics-youtube/analytics-youtube.repository';
import { QueryRunner } from 'typeorm';
import { ICreateAnalyticsYoutubeInput } from './analytics-youtube/interfaces/create-analytics-youtube-input.interface';

@Injectable()
export class AnalyticsService {
  constructor(
    private readonly analyticsYoutubeRepository: AnalyticsYoutubeRepository
  ) {}

  async createBA(
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

  async getBAByUserId(userId: number, queryRunner?: QueryRunner) {
    const analyticsYoutube = await this.analyticsYoutubeRepository.findByUserId(
      userId,
      queryRunner
    );
    return analyticsYoutube;
  }

  async getBAByIntegrationId(integrationId: number, queryRunner?: QueryRunner) {
    const analyticsYoutube =
      await this.analyticsYoutubeRepository.findByIntegrationId(
        integrationId,
        queryRunner
      );
    return analyticsYoutube;
  }
}
