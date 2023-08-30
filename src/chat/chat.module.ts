import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation, Message } from 'src/entities';
import { ChatService } from './chat.service';
import { MessageService } from './message/message.service';
import { MessageRepository } from './message/message.repository';
import { ConversationRepository } from './conversation/conversation.repository';
import { ConversationService } from './conversation/conversation.service';
import { ChatGateway } from './chat.gateway';
import { UserModule } from '../user/user.module';
import { UserService } from 'src/user/user.service';
import { ProfileRepository } from 'src/user/profile/profile.repository';
import { ConversationController } from './conversation/converation.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TypeOrmModule.forFeature([Conversation, Message])
  ],
  controllers: [ConversationController],
  providers: [
    ChatGateway,
    ChatService,
    UserService,
    MessageService,
    MessageRepository,
    ConversationRepository,
    ConversationService,
    ProfileRepository
  ]
})
export class ChatModule {}
