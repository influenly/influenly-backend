import { Module } from '@nestjs/common';
import { EchoController } from './echo.controller';

@Module({
  imports: [],
  controllers: [EchoController],
  providers: [],
  exports: []
})
export class EchoModule {}
