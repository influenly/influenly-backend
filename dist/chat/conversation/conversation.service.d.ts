import { ConversationRepository } from './conversation.repository';
import { Conversation } from 'src/entities';
import { ICreateConversationInput } from './interfaces/create-conversation-input.interface';
import { QueryRunner } from 'typeorm';
import { IUpdateConversationInput } from './interfaces/update-conversation-input.interface';
export declare class ConversationService {
    private readonly conversationRepository;
    constructor(conversationRepository: ConversationRepository);
    getAllByUserId(userId: number, fieldToSearchFor: string): Promise<Conversation[]>;
    create(conversation: ICreateConversationInput, queryRunner?: QueryRunner): Promise<Conversation>;
    updateById(conversationId: any, { status }: IUpdateConversationInput): Promise<Conversation>;
}
