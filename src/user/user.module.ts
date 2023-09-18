import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { AnalyticsModule } from 'src/analytics/analytics.module';
import { IntegrationModule } from 'src/integration/integration.module';
import { IntegrationService } from 'src/integration/integration.service';
import { AnalyticsService } from 'src/analytics/analytics.service';
import { NetworkRepository } from './network/network.repository';
import { NetworkService } from './network/network.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AnalyticsModule),
    forwardRef(() => IntegrationModule)
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    NetworkService,
    NetworkRepository,
    IntegrationService,
    AnalyticsService
  ],
  exports: [UserService, UserRepository, AnalyticsService, IntegrationService]
})
export class UserModule {}
