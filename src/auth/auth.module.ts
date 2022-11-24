import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdvertiserModule } from 'src/advertiser/advertiser.module';
import { CreatorModule } from 'src/creator/creator.module';
import { Advertiser, Creator } from 'src/entities';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Advertiser, Creator]),
    AdvertiserModule,
    CreatorModule,
    PassportModule
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
