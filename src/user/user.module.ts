import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdvertiserModule } from 'src/advertiser/advertiser.module';
import { AuthModule } from 'src/auth/auth.module';
import { CreatorModule } from 'src/creator/creator.module';
import { User } from 'src/entities';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule),
    forwardRef(() => CreatorModule),
    AdvertiserModule
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService]
})
export class UserModule {}
