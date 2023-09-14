import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'src/auth/auth.module';

import { Integration } from 'src/entities';

import { IntegrationController } from './integration.controller';
import { IntegrationService } from './integration.service';
import { IntegrationRepository } from './integration.repository';

import { YoutubeService } from 'src/libs/youtube/youtube.service';
import { CredentialService } from './credential/credential.service';
import { CredentialRepository } from './credential/credential.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Integration]), AuthModule],
  controllers: [IntegrationController],
  providers: [
    IntegrationService,
    IntegrationRepository,
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
