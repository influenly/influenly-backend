import { Injectable } from '@nestjs/common';
import { MessageRepository } from './message.repository';
import { ICreateMessageInput } from './interfaces/create-message-input.interface';
import { Message } from 'src/entities';
import { QueryRunner } from 'typeorm';

@Injectable()
export class MessageService {
  constructor(private readonly messageRepository: MessageRepository) {}

  async getByConversationId(conversationId: number): Promise<Message[]> {
    const messages = await this.messageRepository.findByConversationId(
      conversationId
    );
    return messages;
  }

  async create(
    createMessageInput: ICreateMessageInput,
    queryRunner?: QueryRunner
  ): Promise<Message> {
    const newMessage = await this.messageRepository.createAndSave(
      createMessageInput,
      queryRunner
    );
    return newMessage;
  }
}
