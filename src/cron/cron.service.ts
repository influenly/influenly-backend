import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
@Injectable()
export class CronService {
  @Cron(CronExpression.EVERY_30_SECONDS)
  handleEvery30Seconds() {
    console.log('Task executed every 30 seconds');
  }
}
