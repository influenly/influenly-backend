import { Injectable } from '@nestjs/common';
import { AnalyticsYoutubeRepository } from './analytics-youtube/analytics-youtube.repository';
import { QueryRunner } from 'typeorm';
import { YoutubeService } from '../libs/youtube/youtube.service';
import { Credential } from 'src/entities';
import { ICreateAnalyticsYoutubeInput } from './analytics-youtube/interfaces/create-analytics-youtube-input.interface';

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
      {
        access_token: credential.accessToken,
      }
    );
    const channelId = youtubeDataApiResponse[0].id;
    const channelName = youtubeDataApiResponse[0].snippet.title;
    const channelImg = youtubeDataApiResponse[0].snippet.thumbnails.default.url;
    const totalSubs = parseInt(
      youtubeDataApiResponse[0].statistics.subscriberCount
    );
    const totalViews = parseInt(youtubeDataApiResponse[0].statistics.viewCount);
    const totalVideos = parseInt(
      youtubeDataApiResponse[0].statistics.videoCount
    );

    const newAnalyticsYoutube: ICreateAnalyticsYoutubeInput = {
      integrationId,
      channelId,
      channelName,
      channelImg,
      totalSubs,
      totalVideos,
      totalViews
    };
    const createdAnalyticsYoutube =
      await this.analyticsYoutubeRepository.createAndSave(
        newAnalyticsYoutube,
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
}
