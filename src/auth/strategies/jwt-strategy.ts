import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/entities';
import { UserService } from 'src/user/user.service';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    readonly configService: ConfigService
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: JwtStrategy.extractJWT
    });
  }

  private static extractJWT(req: Request): string | null {
    if (
      req.cookies &&
      'access_token' in req.cookies &&
      req.cookies.access_token.length > 0
    ) {
      return req.cookies.access_token;
    }
    return null;
  }
  async validate(payload: IJwtPayload): Promise<User> {
    const { userId } = payload;

    const user = await this.userService.getUserById(userId, false);
    if (!user) throw new UnauthorizedException('Token not valid');

    return user;
  }
}
