import { Injectable, Logger } from '@nestjs/common';
import { ConversationRepository } from './conversation.repository';
import { Conversation } from 'src/entities';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { UserTypes } from 'src/common/constants';

@Injectable()
export class ConversationService {
  constructor(
    private readonly conversationRepository: ConversationRepository
  ) {}

  async getByUserId(userId: number, type: string): Promise<Conversation[]> {
    const fieldToSearchFor =
      type === UserTypes.CREATOR ? 'creatorUserId' : 'advertiserUserId';
    const conversations = await this.conversationRepository.findByUserId(
      userId,
      fieldToSearchFor
    );
    return conversations;
  }

  async createConversation(
    createConversationDto: CreateConversationDto
  ): Promise<Conversation> {
    const newConversation = await this.conversationRepository.createAndSave({
      ...createConversationDto,
      status: 'APPROVAL_PENDING'
    });
    return newConversation;
  }

  async updateById(
    conversationId,
    updateConversationDto: UpdateConversationDto
  ): Promise<Conversation> {
    const updatedConversation = await this.conversationRepository.updateById(
      conversationId,
      updateConversationDto
    );
    console.log(updatedConversation);
    return updatedConversation;
  }
}
