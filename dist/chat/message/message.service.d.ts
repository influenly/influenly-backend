import { MessageRepository } from './message.repository';
import { ICreateMessageInput } from './interfaces/create-message-input.interface';
import { Message } from 'src/entities';
import { QueryRunner } from 'typeorm';
export declare class MessageService {
    private readonly messageRepository;
    constructor(messageRepository: MessageRepository);
    getByConversationId(conversationId: number): Promise<Message[]>;
    create(createMessageInput: ICreateMessageInput, queryRunner?: QueryRunner): Promise<Message>;
}
