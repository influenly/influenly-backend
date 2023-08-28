import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation, Message } from 'src/entities';
import { ChatService } from './chat.service';
import { MessageService } from './message/message.service';
import { MessageRepository } from './message/message.repository';
import { ConversationRepository } from './conversation/conversation.repository';
import { ConversationService } from './conversation/conversation.service';
import { ChatGateway } from './chat.gateway';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Conversation, Message])],
  //   controllers: [],
  providers: [
    ChatGateway,
    ChatService,
    MessageService,
    MessageRepository,
    ConversationRepository,
    ConversationService
  ]
})
export class ChatModule {}
