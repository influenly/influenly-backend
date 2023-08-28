import { Injectable, Logger } from '@nestjs/common';
import { ICreateConversationInput } from './interfaces/create-conversation-input.interface';
import { ConversationRepository } from './conversation.repository';
import { Conversation } from 'src/entities';

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
    createConversationInput: ICreateConversationInput
  ): Promise<Conversation> {
    const newConversation = await this.conversationRepository.createAndSave(
      createConversationInput
    );
    return newConversation;
  }
}
