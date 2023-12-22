import {
  Logger,
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInRequestDto, SignUpRequestDto } from './dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  async signUp(
    @Body()
    signUpRequestDto: SignUpRequestDto
  ) {
    try {
      const signUpResult = await this.authService.signUp(signUpRequestDto);
      Logger.log(
        `User ${signUpResult.user.email} created succesfully. Type: ${signUpResult.user.type}`
      );
      return {
        ok: true,
        user: signUpResult.user,
        token: signUpResult.token
      };
    } catch (error) {
      throw new HttpException(
        { ok: false, error: error.message },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Post('/sign-in')
  async signIn(@Body() signInRequestDto: SignInRequestDto) {
    try {
      const signInResult = await this.authService.signIn(signInRequestDto);
      return {
        ok: true,
        user: signInResult.user,
        token: signInResult.token
      };
    } catch (error) {
      throw new HttpException(
        { ok: false, error: error.message },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
