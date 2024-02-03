import { AuthService } from './auth.service';
import { SignInRequestDto, SignUpRequestDto } from './dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(signUpRequestDto: SignUpRequestDto): Promise<{
        ok: boolean;
        user: import("../entities").User;
        token: string;
    }>;
    signIn(signInRequestDto: SignInRequestDto): Promise<{
        ok: boolean;
        user: import("../entities").User;
        token: string;
    }>;
}
