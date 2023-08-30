import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { NestGateway } from '@nestjs/websockets/interfaces/nest-gateway.interface';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import {
  AuthSocket,
  WSAuthMiddleware
} from 'src/middlewares/socket-auth.middleware';
import { SendMessageEventDto } from './dto/send-message-event.dto';
import { Logger, UsePipes, ValidationPipe } from '@nestjs/common';

@WebSocketGateway(3001, {
  cors: {
    origin: '*'
  }
})
@UsePipes(new ValidationPipe())
export class ChatGateway implements NestGateway {
  constructor(
    private readonly chatService: ChatService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}
  @WebSocketServer()
  server: SocketIOServer;

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @ConnectedSocket() client: AuthSocket,
    @MessageBody() eventBody: SendMessageEventDto
  ): Promise<void> {
    await this.chatService.createMessage({
      ...eventBody,
      senderUserId: client.user.id
    });
    this.server.emit(`recMessage-${client.user.id}`, eventBody);
  }

  afterInit(server: SocketIOServer) {
    const middle = WSAuthMiddleware(this.jwtService, this.userService);
    server.use(middle);
    Logger.log(`WS ${ChatGateway.name} init`);
  }
  handleDisconnect(client: Socket) {
    Logger.log('client disconnect', client.id);
  }

  handleConnection(client: AuthSocket, ...args: any[]) {
    Logger.log(`user id ${client.user.id} connected - client id ${client.id}`);
  }
}
