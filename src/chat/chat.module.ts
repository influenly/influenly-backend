import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation, Message } from 'src/entities';
// import { ConversationRepository } from './conversation/conversation.repository';
// import { MessageRepository } from './message/message.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Conversation, Message])]
  //   controllers: [],
  //   providers: [AnalyticsService, AnalyticsRepository, AnalyticsYoutubeRepository]
})
export class ChatModule {}
