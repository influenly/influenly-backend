import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation, Message } from 'src/entities';
import { ChatService } from './chat.service';
import { MessageService } from './message/message.service';
import { MessageRepository } from './message/message.repository';
import { ConversationRepository } from './conversation/conversation.repository';
import { ConversationService } from './conversation/conversation.service';
import { SocketGateway } from './socket.gateway';
import { UserModule } from '../user/user.module';
import { UserService } from 'src/user/user.service';
import { ChatController } from './chat.controller';
import { AuthModule } from '../auth/auth.module';
import { NetworkService } from 'src/user/network/network.service';
import { NetworkRepository } from 'src/user/network/network.repository';
import { AnalyticsService } from '../analytics/analytics.service';
import { AnalyticsYoutubeRepository } from 'src/analytics/analytics-youtube/analytics-youtube.repository';
import { IntegrationService } from 'src/integration/integration.service';
import { IntegrationRepository } from 'src/integration/integration.repository';
import { CredentialService } from 'src/integration/credential/credential.service';
import { YoutubeService } from 'src/libs/youtube/youtube.service';
import { CredentialRepository } from 'src/integration/credential/credential.repository';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TypeOrmModule.forFeature([Conversation, Message])
  ],
  controllers: [ChatController],
  providers: [
    SocketGateway,
    ChatService,
    NetworkService,
    NetworkRepository,
    AnalyticsService,
    AnalyticsYoutubeRepository,
    IntegrationService,
    IntegrationRepository,
    CredentialService,
    CredentialRepository,
    YoutubeService,
    UserService,
    MessageService,
    MessageRepository,
    ConversationRepository,
    ConversationService
  ]
})
export class ChatModule {}
