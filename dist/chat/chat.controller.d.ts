import { User } from 'src/entities';
import { CreateConversationDto } from './conversation/dto/create-conversation.dto';
import { UpdateConversationDto } from './conversation/dto/update-conversation.dto';
import { ChatService } from './chat.service';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    getConversationsByUserId({ id, type }: User): Promise<import("src/entities").Conversation[]>;
    getMessagesByConversationId(conversationId: number): Promise<import("src/entities").Message[]>;
    createConversation({ id }: User, createConversationDto: CreateConversationDto): Promise<import("src/entities").Conversation>;
    updateConversation(conversationId: number, updateConversationDto: UpdateConversationDto): Promise<import("src/entities").Conversation>;
}
