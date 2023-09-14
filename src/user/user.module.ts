import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/entities';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { ProfileService } from './profile/profile.service';
import { ProfileRepository } from './profile/profile.repository';
import { AnalyticsModule } from 'src/analytics/analytics.module';
import { IntegrationModule } from 'src/integration/integration.module';
import { IntegrationService } from 'src/integration/integration.service';
import { AnalyticsService } from 'src/analytics/analytics.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    AnalyticsModule,
    IntegrationModule
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    ProfileService,
    ProfileRepository,
    IntegrationService,
    AnalyticsService
  ],
  exports: [
    UserService,
    UserRepository,
    AnalyticsService,
    IntegrationService,
    ProfileRepository
  ]
})
export class UserModule {}
