import { JwtService } from '@nestjs/jwt';
import { SignInRequestDto, SignUpRequestDto } from './dto';
import { UserService } from 'src/user/user.service';
export declare class AuthService {
    private readonly userService;
    private readonly jwService;
    constructor(userService: UserService, jwService: JwtService);
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
    private getJwtToken;
}
