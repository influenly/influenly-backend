import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { AnalyticsModule } from 'src/analytics/analytics.module';
import { AnalyticsService } from 'src/analytics/analytics.service';
import { NetworkRepository } from './network/network.repository';
import { NetworkService } from './network/network.service';
import { YoutubeService } from 'src/libs/youtube/youtube.service';
import { AnalyticsYoutubeRepository } from 'src/analytics/analytics-youtube/analytics-youtube.repository';
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { AWSService } from 'src/libs/aws/aws.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    AnalyticsModule,
    forwardRef(() => AuthModule),
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    NetworkService,
    NetworkRepository,
    AnalyticsService,
    AnalyticsYoutubeRepository,
    YoutubeService,
    AWSService
  ],
  exports: [UserService, UserRepository, PassportModule, AWSService]
})
export class UserModule {}
