import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Creator } from 'src/entities';
import { CreatorController } from './creator.controller';
import { CreatorService } from './creator.service';

@Module({
  imports: [TypeOrmModule.forFeature([Creator]), AuthModule],
  controllers: [CreatorController],
  providers: [CreatorService],
  exports: [CreatorService]
})
export class CreatorModule {}
