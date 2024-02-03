import { Server as SocketIOServer, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { NestGateway } from '@nestjs/websockets/interfaces/nest-gateway.interface';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthSocket } from 'src/middlewares/socket-auth.middleware';
import { SendMessageEventDto } from './dto/send-message-event.dto';
export declare class SocketGateway implements NestGateway {
    private readonly chatService;
    private readonly jwtService;
    private readonly userService;
    constructor(chatService: ChatService, jwtService: JwtService, userService: UserService);
    server: SocketIOServer;
    handleSendMessage(client: AuthSocket, sendMessageEventBody: SendMessageEventDto): Promise<void>;
    afterInit(server: SocketIOServer): void;
    handleDisconnect(client: Socket): void;
    handleConnection(client: AuthSocket, ...args: any[]): void;
}
