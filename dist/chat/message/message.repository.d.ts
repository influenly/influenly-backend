import { DataSource, Repository, QueryRunner } from 'typeorm';
import { Message } from 'src/entities';
import { ICreateMessageInput } from './interfaces/create-message-input.interface';
export declare class MessageRepository extends Repository<Message> {
    constructor(dataSource: DataSource);
    findByConversationId(conversationId: number, queryRunner?: QueryRunner): Promise<Message[]>;
    createAndSave(createMessageInput: ICreateMessageInput, queryRunner?: QueryRunner): Promise<Message>;
}
