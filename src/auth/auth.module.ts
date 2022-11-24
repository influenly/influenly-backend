import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdvertiserService } from 'src/advertiser/advertiser.service';
import { CreatorService } from 'src/creator/creator.service';
import { Advertiser, Creator } from 'src/entities';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, CreatorService, AdvertiserService],
  imports: [TypeOrmModule.forFeature([Advertiser, Creator]), PassportModule]
})
export class AuthModule {}
