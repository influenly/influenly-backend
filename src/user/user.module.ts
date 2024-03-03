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
import { YoutubeService } from 'src/libs/youtube/youtube.service';
import { IntegrationRepository } from 'src/integration/integration.repository';
import { AnalyticsYoutubeRepository } from 'src/analytics/analytics-youtube/analytics-youtube.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    AnalyticsModule,
    forwardRef(() => IntegrationModule),
    AuthModule
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    NetworkService,
    NetworkRepository,
    IntegrationService,
    IntegrationRepository,
    AnalyticsService,
    AnalyticsYoutubeRepository,
    YoutubeService
  ],
  exports: [UserService, UserRepository]
})
export class UserModule {}
