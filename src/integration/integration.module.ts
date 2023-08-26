import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnalyticsModule } from 'src/analytics/analytics.module';
import { AuthModule } from 'src/auth/auth.module';

import { Integration } from 'src/entities';

import { IntegrationController } from './integration.controller';

import { GoogleService } from 'src/libs/google/google.service';
import { IntegrationService } from './integration.service';

import { IntegrationRepository } from './integration.repository';
import { AnalyticsRepository } from 'src/analytics/analytics.repository';
import { AnalyticsYoutubeRepository } from 'src/analytics/analytics-youtube/analytics-youtube.repository';
import { UserRepository } from 'src/user/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Integration]),
    AuthModule,
    AnalyticsModule
  ],
  controllers: [IntegrationController],
  providers: [
    IntegrationService,
    IntegrationRepository,
    GoogleService,
    AnalyticsRepository,
    AnalyticsYoutubeRepository
  ]
})
export class IntegrationModule {}
