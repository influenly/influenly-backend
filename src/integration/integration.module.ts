import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Integration } from 'src/entities';
import { GoogleService } from 'src/libs/google/google.service';
import { IntegrationController } from './integration.controller';
import { IntegrationService } from './integration.service';

@Module({
  imports: [TypeOrmModule.forFeature([Integration]), AuthModule],
  controllers: [IntegrationController],
  providers: [IntegrationService, GoogleService]
})
export class IntegrationModule {}
