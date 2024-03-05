import { Module } from '@nestjs/common';
import { EchoController } from './echo.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [EchoController],
  providers: [],
  exports: []
})
export class EchoModule {}
