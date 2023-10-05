import { BaseEntity } from 'typeorm';
import { User } from './user.entity';
import { ConversationType } from 'src/common/constants/types';
export declare class Conversation extends BaseEntity {
    id: number;
    advertiserUserId: number;
    creatorUserId: number;
    status: ConversationType;
    createdAt: Date;
    updatedAt: Date;
    advertiserUser: User;
    creatorUser: User;
}
