import { Injectable, Logger } from '@nestjs/common';
import { MessageService } from './message/message.service';
import { ICreateMessageInput } from './message/interfaces/create-message-input.interface';
import { Conversation, Message } from 'src/entities';
import { CreateConversationDto } from './conversation/dto/create-conversation.dto';
import { ConversationService } from './conversation/conversation.service';
import { UserTypes } from 'src/common/constants';
import { UpdateConversationDto } from './conversation/dto/update-conversation.dto';

@Injectable()
export class ChatService {
  constructor(
    private readonly messageService: MessageService,
    private readonly conversationService: ConversationService
  ) {}
  async createMessage(createMessageInput: ICreateMessageInput): Promise<void> {
    const newMessage = await this.messageService.create(createMessageInput);
    Logger.log(`Message id ${newMessage} created`);
  }

  async createConversation(
    createConversationDto: CreateConversationDto
  ): Promise<Conversation> {
    const newConversation = {
      ...createConversationDto,
      status: 'APPROVAL_PENDING'
    };
    const createdConversation = await this.conversationService.create(
      newConversation
    );
    return createdConversation;
  }

  async getConversationsByUserId(
    userId: number,
    type: string
  ): Promise<Conversation[]> {
    const fieldToSearchFor =
      type === UserTypes.CREATOR ? 'creatorUserId' : 'advertiserUserId';
    const conversations = await this.conversationService.getAllByUserId(
      userId,
      fieldToSearchFor
    );
    return conversations;
  }

  async getMessagesByConversationId(
    conversationId: number
  ): Promise<Message[]> {
    const messages = await this.messageService.getByConversationId(
      conversationId
    );
    return messages;
  }

  async updateById(
    updateConversationDto: UpdateConversationDto
  ): Promise<Conversation> {
    const updatedConversation = await this.conversationService.updateById(
      updateConversationDto
    );
    return updatedConversation;
  }
}
