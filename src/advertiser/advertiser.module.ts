import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AdvertiserInfo } from 'src/entities';
import { AdvertiserController } from './advertiser.controller';
import { AdvertiserRepository } from './advertiser.repository';
import { AdvertiserService } from './advertiser.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdvertiserInfo]),
    forwardRef(() => AuthModule)
  ],
  controllers: [AdvertiserController],
  providers: [AdvertiserService, AdvertiserRepository],
  exports: [AdvertiserService, AdvertiserRepository]
})
export class AdvertiserModule {}
