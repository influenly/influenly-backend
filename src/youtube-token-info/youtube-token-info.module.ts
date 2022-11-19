import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { YoutubeTokenInfo } from 'src/entities';
import { YoutubeTokenInfoController } from './youtube-token-info.controller';
import { YoutubeTokenInfoService } from './youtube-token-info.service';

@Module({
  imports: [TypeOrmModule.forFeature([YoutubeTokenInfo])],
  controllers: [YoutubeTokenInfoController],
  providers: [YoutubeTokenInfoService]
})
export class YoutubeTokenInfoModule {}
