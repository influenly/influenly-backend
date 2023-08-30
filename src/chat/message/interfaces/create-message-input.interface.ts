import { MessageType } from 'src/common/constants/types';

export interface ICreateMessageInput {
  conversationId: number;
  senderUserId: number;
  content: string;
  type: MessageType;
}
