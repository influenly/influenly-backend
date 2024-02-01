import { Injectable } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { AnalyticsYoutubeRepository } from './analytics-youtube/analytics-youtube.repository';
import {
  ICreateBAYoutubeInput,
  IUpdateBAYoutubeInput
} from './analytics-youtube/interfaces';

@Injectable()
export class AnalyticsService {
  constructor(
    private readonly analyticsYoutubeRepository: AnalyticsYoutubeRepository
  ) {}

  async createBA(
    createBAYoutubeInput: ICreateBAYoutubeInput,
    queryRunner?: QueryRunner
  ) {
    const createdBAYoutube =
      await this.analyticsYoutubeRepository.createAndSave(
        createBAYoutubeInput,
        queryRunner
      );
    return createdBAYoutube;
  }

  async updateBAByIntegrationId(
    integrationId: number,
    updateBAYoutubeInput: IUpdateBAYoutubeInput,
    queryRunner?: QueryRunner
  ) {
    const updatedBAYoutube =
      await this.analyticsYoutubeRepository.updateByIntegrationId(
        integrationId,
        updateBAYoutubeInput,
        queryRunner
      );
    return updatedBAYoutube;
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
