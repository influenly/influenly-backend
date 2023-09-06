import { Injectable, Logger } from '@nestjs/common';
import { MessageService } from './message/message.service';
import { ICreateMessageInput } from './message/interfaces/create-message-input.interface';
import { Conversation, Message } from 'src/entities';
import { ConversationService } from './conversation/conversation.service';
import { UserTypes } from 'src/common/constants';
import { UpdateConversationDto } from './conversation/dto/update-conversation.dto';
import { ICreateConversationInput } from './conversation/interfaces/create-conversation-input.interface';
import { UserService } from 'src/user/user.service';
import { DataSource } from 'typeorm';
import { MessageTypes } from 'src/common/constants/enums';

@Injectable()
export class ChatService {
  constructor(
    private readonly messageService: MessageService,
    private readonly conversationService: ConversationService,
    private readonly userService: UserService,
    private readonly dataSource: DataSource
  ) {}
  async createMessage(createMessageInput: ICreateMessageInput): Promise<void> {
    const newMessage = await this.messageService.create(createMessageInput);
    Logger.log(`Message id ${newMessage} created`);
  }

  async createConversation(
    createConversationInput: Omit<ICreateConversationInput, 'status'> & {
      message: string;
    }
  ): Promise<Conversation> {
    const targetUser = await this.userService.getUserById(
      createConversationInput.creatorUserId
    );
    if (targetUser.type !== UserTypes.CREATOR) {
      throw new Error('Invalid creator user id');
    }

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newConversation = {
        ...createConversationInput,
        status: 'APPROVAL_PENDING'
      };
      const createdConversation = await this.conversationService.create(
        newConversation,
        queryRunner
      );
      const newMessage: ICreateMessageInput = {
        conversationId: createdConversation.id,
        senderUserId: createConversationInput.advertiserUserId,
        content: createConversationInput.message,
        type: MessageTypes.INITIALIZER
      };
      const createdMessage = await this.messageService.create(
        newMessage,
        queryRunner
      );

      await queryRunner.commitTransaction();

      console.log(createdMessage);

      return createdConversation;
    } catch (err) {
      Logger.error(`Conversation and initial message creation has failed.`);
      await queryRunner.rollbackTransaction();
      throw new Error(err.message);
    } finally {
      await queryRunner.release();
    }
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
