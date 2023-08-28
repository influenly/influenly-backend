import { Injectable, Logger } from '@nestjs/common';
import { MessageService } from './message/message.service';
import { ICreateMessageInput } from './message/interfaces/create-message-input.interface';

@Injectable()
export class ChatService {
  constructor(private readonly messageService: MessageService) {}
  async createMessage(createMessageInput: ICreateMessageInput): Promise<void> {
    const newMessage = await this.messageService.create(createMessageInput);
    Logger.log(`Message id ${newMessage} created`);
  }

  //   async getMessages(): Promise<Chat[]> {
  //     return await this.chatRepository.find();
  //   }
}
