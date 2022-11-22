import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Query,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  SignInRequestDto,
  SignUpAdvertiserRequestDto,
  SignUpCreatorRequestDto
} from './dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up/creator')
  @UsePipes(ValidationPipe)
  async signUpCreator(
    @Body()
    signUpCreatorRequestDto: SignUpCreatorRequestDto
  ) {
    try {
      const signUpCreatorResult = await this.authService.signUpCreator(
        signUpCreatorRequestDto
      );
      return signUpCreatorResult;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/sign-up/advertiser')
  @UsePipes(ValidationPipe)
  async signUpAdvertiser(
    @Body()
    signUpAdvertiserRequestDto: SignUpAdvertiserRequestDto
  ) {
    try {
      const signUpAdvertiserResult = await this.authService.signUpAdvertiser(
        signUpAdvertiserRequestDto
      );
      return signUpAdvertiserResult;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/sign-in')
  @UsePipes(ValidationPipe)
  async signIn(@Body() signInRequestDto: SignInRequestDto) {
    try {
      const signInResult = await this.authService.signIn(signInRequestDto);
      return signInResult;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
