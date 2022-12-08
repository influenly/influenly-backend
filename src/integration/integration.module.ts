import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CreatorModule } from 'src/creator/creator.module';
import { CreatorRepository } from 'src/creator/creator.repository';
import { Integration } from 'src/entities';
import { GoogleService } from 'src/libs/google/google.service';
import { IntegrationController } from './integration.controller';
import { IntegrationRepository } from './integration.repository';
import { IntegrationService } from './integration.service';

@Module({
  imports: [TypeOrmModule.forFeature([Integration]), AuthModule, CreatorModule],
  controllers: [IntegrationController],
  providers: [
    IntegrationService,
    IntegrationRepository,
    GoogleService,
    CreatorRepository
  ]
})
export class IntegrationModule {}
