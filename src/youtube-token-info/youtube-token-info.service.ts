import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { YoutubeTokenInfo } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateYoutubeTokenInfoDto, UpdateYoutubeTokenInfoDto } from './dto';

@Injectable()
export class YoutubeTokenInfoService {
  constructor(
    @InjectRepository(YoutubeTokenInfo)
    private readonly youtubeTokenInfoRepository: Repository<YoutubeTokenInfo>
  ) {}
  async getAllYoutubeTokenInfo(): Promise<YoutubeTokenInfo[]> {
    const youtubeTokenInfo = await this.youtubeTokenInfoRepository.find();
    return youtubeTokenInfo;
  }

  async getYoutubeTokenInfo(id: number): Promise<YoutubeTokenInfo> {
    const youtubeTokenInfo = await this.youtubeTokenInfoRepository.findOne({
      where: { id }
    });
    return youtubeTokenInfo;
  }

  async createYoutubeTokenInfo(
    createYoutubeTokenInfoDto: CreateYoutubeTokenInfoDto
  ): Promise<YoutubeTokenInfo> {
    const newYoutubeTokenInfo = this.youtubeTokenInfoRepository.create(
      createYoutubeTokenInfoDto
    );
    await this.youtubeTokenInfoRepository.save(newYoutubeTokenInfo);
    return newYoutubeTokenInfo;
  }

  async updateYoutubeTokenInfo(
    updateYoutubeTokenInfoDto: UpdateYoutubeTokenInfoDto
  ): Promise<YoutubeTokenInfo> {
    const queryResult = await this.youtubeTokenInfoRepository
      .createQueryBuilder()
      .update(updateYoutubeTokenInfoDto)
      .where({
        id: updateYoutubeTokenInfoDto.id
      })
      .returning('*')
      .execute();

    return queryResult.raw[0];
  }

  async deleteYoutubeTokenInfo(id: number): Promise<YoutubeTokenInfo> {
    const queryResult = await this.youtubeTokenInfoRepository
      .createQueryBuilder()
      .delete()
      .where({
        id
      })
      .returning('*')
      .execute();

    return queryResult.raw[0];
  }
}
