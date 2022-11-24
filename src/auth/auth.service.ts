import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { SignInRequestDto, SignUpRequestDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async signUp(signUpRequestDto: SignUpRequestDto) {
    try {
      const { userType, password } = signUpRequestDto;
      const hashedPassword = bcrypt.hashSync(password, 10);
      //TODO: DO NOT MUTATE INPUT VARIABLE. FUNCTIONAL PROGRAMMING
      signUpRequestDto = { ...signUpRequestDto, password: hashedPassword };

      const newUser = await this.userService.createUser(signUpRequestDto);
      return newUser;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async signIn(signInRequestDto: SignInRequestDto) {
    try {
      const { email, password } = signInRequestDto;

      const user = await this.userService.getUserByEmail(email);

      if (!user) {
        throw new Error('Credentials are not valid (email)');
      }

      if (!bcrypt.compareSync(password, user.password)) {
        throw new Error('Credentials are not valid (password)');
      }

      delete user.password;
      return user;
      //TODO return jwt
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
