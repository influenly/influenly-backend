import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt-strategy';
import { AnalyticsModule } from 'src/analytics/analytics.module';
import { ProfileRepository } from 'src/user/profile/profile.repository';

@Module({
  imports: [
    AnalyticsModule,
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
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
  providers: [AuthService, JwtStrategy, UserService, ProfileRepository],
  exports: [PassportModule, JwtStrategy]
})
export class AuthModule {}
