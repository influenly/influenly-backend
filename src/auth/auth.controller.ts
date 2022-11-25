import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInRequestDto, SignUpRequestDto } from '../common/dto';
import { Auth } from './decorators';
import { UserRoles } from 'src/common/constants';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  @UsePipes(ValidationPipe)
  async signUp(
    @Body()
    signUpRequestDto: SignUpRequestDto
  ) {
    try {
      const signUpResult = await this.authService.signUp(signUpRequestDto);
      return signUpResult;
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

  @Auth(UserRoles.ADMIN)
  @Get('/admin')
  async private() {
    return 'private route';
  }
}
