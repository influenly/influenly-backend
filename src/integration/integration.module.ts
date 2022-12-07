import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Integration } from 'src/entities';
import { GoogleOAuth2Service } from 'src/libs/google/oauth2';
import { IntegrationController } from './integration.controller';
import { IntegrationService } from './integration.service';

@Module({
  imports: [TypeOrmModule.forFeature([Integration]), AuthModule],
  controllers: [IntegrationController],
  providers: [IntegrationService, GoogleOAuth2Service]
})
export class IntegrationModule {}
