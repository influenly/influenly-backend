import {
  Logger,
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Res
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInRequestDto, SignUpRequestDto } from './dto';
import { Response } from 'express';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(
    @Res({ passthrough: true })
    res: Response,
    @Body()
    signUpRequestDto: SignUpRequestDto
  ) {
    try {
      const signUpResult = await this.authService.signUp(signUpRequestDto);
      Logger.log(
        `User ${signUpResult.user.email} created succesfully. Type: ${signUpResult.user.type}`
      );
      res.cookie('access_token', signUpResult.token, {
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
        // secure: false,
        // path: '/'
      });
      return {
        ok: true,
        user: signUpResult.user
      };
    } catch (error) {
      throw new HttpException(
        { ok: false, error: error.message },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Post('/login')
  async signIn(
    @Res({ passthrough: true })
    res: Response,
    @Body() signInRequestDto: SignInRequestDto
  ) {
    try {
      const signInResult = await this.authService.signIn(signInRequestDto);
      res.cookie('access_token', signInResult.token, {
        expires: new Date(Date.now() + 3600000),
        httpOnly: true
      });
      return {
        ok: true,
        user: signInResult.user
      };
    } catch (error) {
      throw new HttpException(
        { ok: false, error: error.message },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Post('/logout')
  async logout(
    @Res({ passthrough: true })
    res: Response
  ) {
    try {
      res.cookie('access_token', '', {
        expires: new Date(Date.now()),
        httpOnly: true
      });
      return {
        ok: true
      };
    } catch (error) {
      throw new HttpException(
        { ok: false, error: error.message },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
