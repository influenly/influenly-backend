import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Integration } from 'src/entities';

import { IntegrationController } from './integration.controller';
import { IntegrationService } from './integration.service';
import { IntegrationRepository } from './integration.repository';

import { YoutubeService } from 'src/libs/youtube/youtube.service';
import { CredentialService } from './credential/credential.service';
import { CredentialRepository } from './credential/credential.repository';
import { UserModule } from 'src/user/user.module';
import { NetworkService } from 'src/user/network/network.service';
import { NetworkRepository } from 'src/user/network/network.repository';
import { AnalyticsService } from 'src/analytics/analytics.service';
import { UserService } from 'src/user/user.service';
import { AnalyticsYoutubeRepository } from 'src/analytics/analytics-youtube/analytics-youtube.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Integration]),
    forwardRef(() => UserModule)
  ],
  controllers: [IntegrationController],
  providers: [
    UserService,
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
  exports: [IntegrationService, CredentialService]
})
export class IntegrationModule {}
