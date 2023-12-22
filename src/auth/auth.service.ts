import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignInRequestDto, SignUpRequestDto } from './dto';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { Errors } from 'src/common/constants/enums';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwService: JwtService
  ) {}
  async signUp(signUpRequestDto: SignUpRequestDto) {
    const { type, password, email } = signUpRequestDto;

    try {
      const hashedPassword = bcrypt.hashSync(password, 10);

      signUpRequestDto = { ...signUpRequestDto, password: hashedPassword };

      const newUser = await this.userService.create(signUpRequestDto);

      const { id: userId } = newUser;

      const token = this.getJwtToken({ userId, userType: type });

      return {
        user: newUser,
        token
      };
    } catch (error) {
      Logger.error(`User signup transaction has failed. ${error.detail}`);
      const errorMessage =
        error.detail === `Key (email)=(${email}) already exists.`
          ? Errors.EMAIL_ALREADY_EXISTS
          : error.message;
      throw new Error(errorMessage);
    }
  }

  async signIn(signInRequestDto: SignInRequestDto) {
    try {
      const { email, password } = signInRequestDto;

      const user = await this.userService.getUserByEmail(email);

      if (!user) {
        throw new Error(Errors.INVALID_EMAIL);
      }

      if (!bcrypt.compareSync(password, user.password)) {
        throw new Error(Errors.INVALID_PASSWORD);
      }

      const { type: userType, id: userId } = user;

      const token = this.getJwtToken({ userId, userType });

      delete user.password;

      return {
        user,
        token
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  private getJwtToken(payload: IJwtPayload): string {
    return this.jwService.sign(payload);
  }
}
