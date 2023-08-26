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
import { AnalyticsRepository } from 'src/analytics/analytics.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    AnalyticsModule,
    forwardRef(() => AuthModule)
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    ProfileService,
    ProfileRepository,
    AnalyticsRepository
  ],
  exports: [UserService, UserRepository]
})
export class UserModule {}
