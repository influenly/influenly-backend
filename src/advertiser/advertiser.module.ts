import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Advertiser } from 'src/entities';
import { AdvertiserController } from './advertiser.controller';
import { AdvertiserService } from './advertiser.service';

@Module({
  imports: [TypeOrmModule.forFeature([Advertiser])],
  controllers: [AdvertiserController],
  providers: [AdvertiserService],
  exports: [AdvertiserService]
})
export class AdvertiserModule {}
