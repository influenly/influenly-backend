import { Injectable } from '@nestjs/common';
import { ConversationRepository } from './conversation.repository';
import { Conversation } from 'src/entities';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { ICreateConversationInput } from './interfaces/create-conversation-input.interface';
import { QueryRunner } from 'typeorm';

@Injectable()
export class ConversationService {
  constructor(
    private readonly conversationRepository: ConversationRepository
  ) {}

  async getAllByUserId(
    userId: number,
    fieldToSearchFor: string
  ): Promise<Conversation[]> {
    const conversations = await this.conversationRepository.findByUserId(
      userId,
      fieldToSearchFor
    );
    return conversations;
  }

  async create(
    conversation: ICreateConversationInput,
    queryRunner?: QueryRunner
  ): Promise<Conversation> {
    const newConversation = await this.conversationRepository.createAndSave(
      conversation,
      queryRunner
    );
    return newConversation;
  }

  async updateById({
    id,
    status
  }: UpdateConversationDto): Promise<Conversation> {
    const updatedConversation = await this.conversationRepository.updateById(
      id,
      { status }
    );
    return updatedConversation;
  }
}
