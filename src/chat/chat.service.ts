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
import { ConversationTypes, MessageTypes } from 'src/common/constants/enums';
import { IUpdateConversationInput } from './conversation/interfaces/update-conversation-input.interface';

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
  ): Promise<any> {
    const creatorUserId = createConversationInput.creatorUserId;
    const advertiserUserId = createConversationInput.advertiserUserId;

    const creatorUser = await this.userService.getUserById(
      creatorUserId,
      false
    );

    if (creatorUser.type !== UserTypes.CREATOR) {
      throw new Error('Invalid creator user id');
    }

    const userConversations = await this.getConversationsByUserId(
      creatorUserId,
      UserTypes.CREATOR
    );

    const existingConversation = userConversations.filter(
      (conversation) => conversation.advertiserUserId === advertiserUserId
    )[0];

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    if (existingConversation) {
      if (existingConversation.status !== ConversationTypes.FINISHED)
        throw new Error('Conversation must end before starting a new one.');
      const updatedConversation = await this.updateById(
        existingConversation.id,
        { status: ConversationTypes.INIT_APPROVAL_PENDING }
      );

      return updatedConversation;
    }

    try {
      const newConversation = {
        ...createConversationInput,
        status: ConversationTypes.INIT_APPROVAL_PENDING
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
    type: UserTypes
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
    conversationId: number,
    { status }: IUpdateConversationInput
  ): Promise<Conversation> {
    const updatedConversation = await this.conversationService.updateById(
      conversationId,
      { status }
    );
    return updatedConversation;
  }
}
