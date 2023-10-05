import { ConversationType } from 'src/common/constants/types';
export interface ICreateConversationInput {
    advertiserUserId: number;
    creatorUserId: number;
    status: ConversationType;
}
