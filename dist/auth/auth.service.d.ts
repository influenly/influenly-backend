import { JwtService } from '@nestjs/jwt';
import { SignInRequestDto, SignUpRequestDto } from './dto';
import { UserService } from 'src/user/user.service';
export declare class AuthService {
    private readonly userService;
    private readonly jwService;
    constructor(userService: UserService, jwService: JwtService);
    signUp(signUpRequestDto: SignUpRequestDto): Promise<{
        user: import("../entities").User;
        token: string;
    }>;
    signIn(signInRequestDto: SignInRequestDto): Promise<{
        user: import("../entities").User;
        token: string;
    }>;
    private getJwtToken;
}
