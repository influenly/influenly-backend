import { DataSource, Repository, QueryRunner } from 'typeorm';
import { Conversation } from 'src/entities';
import { ICreateConversationInput } from './interfaces/create-conversation-input.interface';
import { IUpdateConversationInput } from './interfaces/update-conversation-input.interface';
export declare class ConversationRepository extends Repository<Conversation> {
    constructor(dataSource: DataSource);
    findByUserId(userId: number, field: string, queryRunner?: QueryRunner): Promise<Conversation[]>;
    createAndSave(createConversationInput: ICreateConversationInput, queryRunner?: QueryRunner): Promise<Conversation>;
    updateById(id: number, updateConversationInput: IUpdateConversationInput, queryRunner?: QueryRunner): Promise<Conversation>;
}
