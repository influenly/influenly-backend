import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenInfo } from 'src/entities';
import { TokenInfoService } from './token-info.service';

@Module({
  imports: [TypeOrmModule.forFeature([TokenInfo])],
  providers: [TokenInfoService]
})
export class TokenInfoModule {}
