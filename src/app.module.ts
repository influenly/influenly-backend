import { Module } from '@nestjs/common';
import { AdvertiserModule } from './advertiser/advertiser.module';
import { CreatorModule } from './creator/creator.module';
@Module({
  imports: [AdvertiserModule, CreatorModule]
})
export class AppModule {}
