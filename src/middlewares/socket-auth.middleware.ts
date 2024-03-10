import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';
import { UserService } from 'src/user/user.service';
import { User } from 'src/entities';
import { IJwtPayload } from 'src/auth/interfaces/jwt-payload.interface';

export interface AuthSocket extends Socket {
  user: User;
}
export type SocketMiddleware = (
  socket: Socket,
  next: (err?: Error) => void
) => void;
export const WSAuthMiddleware = (
  jwtService: JwtService,
  userService: UserService
): SocketMiddleware => {
  return async (socket: AuthSocket, next) => {
    try {
      const jwtPayload = jwtService.verify(
        getCookieValue(socket.handshake.headers.cookie, 'access_token')
      ) as IJwtPayload;
      const user = await userService.getUserById(jwtPayload.userId, false);
      console.log(user);
      if (user) {
        socket.user = user;
        next();
      } else {
        next({
          name: 'Unauthorizaed',
          message: 'Unauthorizaed'
        });
      }
    } catch (error) {
      next({
        name: 'Unauthorizaed',
        message: 'Unauthorizaed'
      });
    }
  };
};

const getCookieValue = (cookieString, cookieName) => {
  const cookies = cookieString.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(cookieName + '=')) {
      return cookie.substring(cookieName.length + 1);
    }
  }
  return null;
};
