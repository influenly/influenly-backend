import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { QueryRunner } from 'typeorm';
import { AnalyticsYoutubeRepository } from './analytics-youtube/analytics-youtube.repository';
import { ICreateBAYoutubeInput } from './analytics-youtube/interfaces/create-analytics-youtube-input.interface';

@Injectable()
export class AnalyticsService {
  constructor(
    private readonly analyticsYoutubeRepository: AnalyticsYoutubeRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async createBA(
    createBAYoutubeInput: ICreateBAYoutubeInput,
    queryRunner?: QueryRunner
  ) {
    const { integrationId, totalSubs, totalVideos } = createBAYoutubeInput;
    const redisResult = await this.cacheManager.set(
      integrationId.toString(),
      {
        totalSubs,
        totalVideos
      },
      86400000
    );
    // const createdAnalyticsYoutube =
    //   await this.analyticsYoutubeRepository.createAndSave(
    //     createAnalyticsYoutubeInput,
    //     queryRunner
    //   );
    return redisResult;
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
