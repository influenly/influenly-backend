import { Injectable } from '@nestjs/common';
import { AnalyticsYoutubeRepository } from './analytics-youtube/analytics-youtube.repository';
import { QueryRunner } from 'typeorm';
import { YoutubeService } from '../libs/youtube/youtube.service';
import { Credential } from 'src/entities';

@Injectable()
export class AnalyticsService {
  constructor(
    private readonly analyticsYoutubeRepository: AnalyticsYoutubeRepository,
    private readonly youtubeService: YoutubeService
  ) {}
  // async getAllAnalyitcs(): Promise<Analytics[]> {
  //   const analytics = await this.analyticsRepository.find();
  //   return analytics;
  // }

  // async getAnalytics(id: number): Promise<Analytics> {
  //   const analytics = await this.analyticsRepository.findOne({
  //     where: { id }
  //   });
  //   return analytics;
  // }
  async createBasicAnalytics(
    integrationId: number,
    credential: Credential,
    queryRunner?: QueryRunner
  ) {
    const youtubeDataApiResponse = await this.youtubeService.getChannelInfo(
      credential
    );
    const youtubeDataApiResponseData = youtubeDataApiResponse.data;
    console.log(youtubeDataApiResponseData);

    const newAnalyticsYoutube = 'asd';
    // await this.analyticsYoutubeRepository.createAndSave(
    //   {
    //     ...youtubeDataApiResponseData,
    //     integrationId
    //   },
    //   queryRunner
    // );
    return newAnalyticsYoutube;
  }

  async getBasicAnalyticsByUserId(userId: number, queryRunner?: QueryRunner) {
    const analyticsYoutube = await this.analyticsYoutubeRepository.findByUserId(
      userId,
      queryRunner
    );
    return analyticsYoutube;
  }
}
