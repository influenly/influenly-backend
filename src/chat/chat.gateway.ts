import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ChatService } from './chat.service';
import { ISendMessageEvent } from './interfaces/send-message-event.interface';
import { Auth } from 'src/auth/decorators';

@Auth()
@WebSocketGateway(3001, {
  namespace: 'chat',
  cors: {
    origin: '*'
  }
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private chatService: ChatService) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    socket: Socket,
    eventPayload: ISendMessageEvent
  ): Promise<void> {
    console.log(eventPayload);
    // await this.chatService.createMessage(eventPayload);
    this.server.emit('recMessage', eventPayload);
  }

  afterInit(server: Server) {
    console.log(server);
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Connected ${client.id}`);
  }
}
