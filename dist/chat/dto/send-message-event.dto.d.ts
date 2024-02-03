import { MessageType } from 'src/common/constants/types';
export declare class SendMessageEventDto {
    conversationId: number;
    receiverUserId: number;
    content: string;
    type: MessageType;
}
