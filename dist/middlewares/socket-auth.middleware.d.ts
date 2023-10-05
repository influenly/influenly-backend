import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import { UserService } from 'src/user/user.service';
import { User } from 'src/entities';
export interface AuthSocket extends Socket {
    user: User;
}
export type SocketMiddleware = (socket: Socket, next: (err?: Error) => void) => void;
export declare const WSAuthMiddleware: (jwtService: JwtService, userService: UserService) => SocketMiddleware;
