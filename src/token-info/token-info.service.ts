import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenInfo } from 'src/entities';
import { Repository } from 'typeorm';
import { CreateTokenInfoDto, UpdateTokenInfoDto } from './dto';

@Injectable()
export class TokenInfoService {
  constructor(
    @InjectRepository(TokenInfo)
    private readonly tokenInfoRepository: Repository<TokenInfo>
  ) {}
  async getAllTokenInfo(): Promise<TokenInfo[]> {
    const tokenInfo = await this.tokenInfoRepository.find();
    return tokenInfo;
  }

  async getTokenInfo(id: number): Promise<TokenInfo> {
    const tokenInfo = await this.tokenInfoRepository.findOne({
      where: { id }
    });
    return tokenInfo;
  }

  async createTokenInfo(
    createTokenInfoDto: CreateTokenInfoDto
  ): Promise<TokenInfo> {
    const newTokenInfo = this.tokenInfoRepository.create(createTokenInfoDto);
    await this.tokenInfoRepository.save(newTokenInfo);
    return newTokenInfo;
  }

  async updateTokenInfo(
    updateTokenInfoDto: UpdateTokenInfoDto
  ): Promise<TokenInfo> {
    const queryResult = await this.tokenInfoRepository
      .createQueryBuilder()
      .update(updateTokenInfoDto)
      .where({
        id: updateTokenInfoDto.id
      })
      .returning('*')
      .execute();

    return queryResult.raw[0];
  }

  async deleteTokenInfo(id: number): Promise<TokenInfo> {
    const queryResult = await this.tokenInfoRepository
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
