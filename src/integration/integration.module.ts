import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';

import { Integration } from 'src/entities';

import { IntegrationController } from './integration.controller';
import { IntegrationService } from './integration.service';
import { IntegrationRepository } from './integration.repository';

import { YoutubeService } from 'src/libs/youtube/youtube.service';
import { CredentialService } from './credential/credential.service';
import { CredentialRepository } from './credential/credential.repository';
import { HttpModule } from '@nestjs/axios';
import { UserModule } from 'src/user/user.module';
import { NetworkService } from 'src/user/network/network.service';
import { NetworkRepository } from 'src/user/network/network.repository';
import { AnalyticsService } from 'src/analytics/analytics.service';
import { AnalyticsYoutubeRepository } from 'src/analytics/analytics-youtube/analytics-youtube.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Integration]), HttpModule, AuthModule, UserModule],
  controllers: [IntegrationController],
  providers: [
    AnalyticsService,
    AnalyticsYoutubeRepository,
    IntegrationService,
    IntegrationRepository,
    NetworkService,
    NetworkRepository,
    YoutubeService,
    CredentialService,
    CredentialRepository
  ],
  exports: [
    IntegrationService,
    IntegrationRepository,
    CredentialService,
    AuthModule
  ]
})
export class IntegrationModule {}
