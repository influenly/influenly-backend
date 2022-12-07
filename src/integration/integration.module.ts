import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Integration } from 'src/entities';
import { IntegrationService } from './integration.service';

@Module({
  imports: [TypeOrmModule.forFeature([Integration])],
  providers: [IntegrationService]
})
export class IntegrationModule {}
