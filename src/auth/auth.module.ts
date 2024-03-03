import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt-strategy';
import { NetworkService } from 'src/user/network/network.service';
import { NetworkRepository } from 'src/user/network/network.repository';
import { YoutubeService } from 'src/libs/youtube/youtube.service';
import { AnalyticsService } from 'src/analytics/analytics.service';
import { IntegrationService } from 'src/integration/integration.service';
import { AnalyticsYoutubeRepository } from 'src/analytics/analytics-youtube/analytics-youtube.repository';
import { IntegrationRepository } from 'src/integration/integration.repository';
import { CredentialService } from 'src/integration/credential/credential.service';
import { CredentialRepository } from 'src/integration/credential/credential.repository';
@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      global: true,
      imports: [],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: '24h'
          }
        };
      }
    })
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    UserService,
    NetworkService,
    NetworkRepository,
    AnalyticsService,
    IntegrationService,
    AnalyticsYoutubeRepository,
    IntegrationRepository,
    CredentialService,
    CredentialRepository,
    YoutubeService
  ],
  exports: [PassportModule, JwtStrategy]
})
export class AuthModule {}
