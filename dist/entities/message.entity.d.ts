import { BaseEntity } from 'typeorm';
import { Conversation } from './conversation-entity';
import { User } from './user.entity';
import { MessageType } from 'src/common/constants/types';
export declare class Message extends BaseEntity {
    id: number;
    conversationId: number;
    senderUserId: number;
    content: string;
    type: MessageType;
    conversation: Conversation;
    senderUser: User;
    createdAt: Date;
    updatedAt: Date;
}
