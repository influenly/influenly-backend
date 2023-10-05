import { MessageService } from './message/message.service';
import { ICreateMessageInput } from './message/interfaces/create-message-input.interface';
import { Conversation, Message } from 'src/entities';
import { ConversationService } from './conversation/conversation.service';
import { ICreateConversationInput } from './conversation/interfaces/create-conversation-input.interface';
import { UserService } from 'src/user/user.service';
import { DataSource } from 'typeorm';
import { IUpdateConversationInput } from './conversation/interfaces/update-conversation-input.interface';
export declare class ChatService {
    private readonly messageService;
    private readonly conversationService;
    private readonly userService;
    private readonly dataSource;
    constructor(messageService: MessageService, conversationService: ConversationService, userService: UserService, dataSource: DataSource);
    createMessage(createMessageInput: ICreateMessageInput): Promise<void>;
    createConversation(createConversationInput: Omit<ICreateConversationInput, 'status'> & {
        message: string;
    }): Promise<Conversation>;
    getConversationsByUserId(userId: number, type: string): Promise<Conversation[]>;
    getMessagesByConversationId(conversationId: number): Promise<Message[]>;
    updateById(conversationId: number, { status }: IUpdateConversationInput): Promise<Conversation>;
}
