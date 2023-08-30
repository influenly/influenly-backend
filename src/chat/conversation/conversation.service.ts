import { Injectable, Logger } from '@nestjs/common';
import { ICreateConversationInput } from './interfaces/create-conversation-input.interface';
import { ConversationRepository } from './conversation.repository';
import { Conversation } from 'src/entities';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';

@Injectable()
export class ConversationService {
  constructor(
    private readonly conversationRepository: ConversationRepository
  ) {}

  //   async getByUserId(id: number): Promise<Conversation> {
  //   //     const conversations = await this.conversationRepository.find({
  //   //       where: { userId: id }
  //   //     });
  //     return conversations;
  //   }

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
