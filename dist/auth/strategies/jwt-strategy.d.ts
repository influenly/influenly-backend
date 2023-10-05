import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { User } from 'src/entities';
import { UserService } from 'src/user/user.service';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userService;
    readonly configService: ConfigService;
    constructor(userService: UserService, configService: ConfigService);
    validate(payload: IJwtPayload): Promise<User>;
}
export {};
