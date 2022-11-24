import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  //   controllers: [AuthController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
