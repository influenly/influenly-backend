import { User } from 'src/entities';
import { CreateConversationDto } from './conversation/dto/create-conversation.dto';
import { UpdateConversationDto } from './conversation/dto/update-conversation.dto';
import { ChatService } from './chat.service';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    getConversationsByUserId({ id, type }: User): Promise<{
        ok: boolean;
        conversations: import("src/entities").Conversation[];
    }>;
    getMessagesByConversationId(conversationId: number): Promise<{
        ok: boolean;
        messages: import("src/entities").Message[];
    }>;
    createConversation({ id }: User, createConversationDto: CreateConversationDto): Promise<{
        ok: boolean;
        conversation: import("src/entities").Conversation;
    }>;
    updateConversation(conversationId: number, updateConversationDto: UpdateConversationDto): Promise<{
        ok: boolean;
        conversation: import("src/entities").Conversation;
    }>;
}
