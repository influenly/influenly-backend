import { AuthService } from './auth.service';
import { SignInRequestDto, SignUpRequestDto } from './dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signUp(signUpRequestDto: SignUpRequestDto): Promise<{
        token: string;
        id: number;
        email: string;
        password: string;
        country: string;
        onboardingCompleted: boolean;
        role: string;
        type: import("../common/constants").UserType;
        username: string;
        profileImg: string;
        description: string;
        contentTags: string[];
        birthDate: Date;
        createdAt: Date;
        updatedAt: Date;
    }>;
    signIn(signInRequestDto: SignInRequestDto): Promise<{
        token: string;
        id: number;
        email: string;
        password: string;
        country: string;
        onboardingCompleted: boolean;
        role: string;
        type: import("../common/constants").UserType;
        username: string;
        profileImg: string;
        description: string;
        contentTags: string[];
        birthDate: Date;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
