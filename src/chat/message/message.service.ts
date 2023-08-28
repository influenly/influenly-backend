import { Injectable, Logger } from '@nestjs/common';
import { MessageRepository } from './message.repository';
import { ICreateMessageInput } from './interfaces/create-message-input.interface';
import { Message } from 'src/entities';

@Injectable()
export class MessageService {
  constructor(private readonly messageRepository: MessageRepository) {}

  //   async getMessage(id: number): Promise<Message> {
  //     const message = await this.messageRepository.findOne({
  //       where: { id }
  //     });
  //     return message;
  //   }

  async create(createMessageInput: ICreateMessageInput): Promise<Message> {
    const newMessage = await this.messageRepository.createAndSave(
      createMessageInput
    );
    return newMessage;
  }
}
