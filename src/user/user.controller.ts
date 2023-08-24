import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CompleteOnboardingDto, UpdateUserDto } from './dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/entities';

@Auth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/onboarding')
  @UsePipes(ValidationPipe)
  async completeOnboarding(
    @GetUser() user: User,
    @Body() completeOnboardingDto: CompleteOnboardingDto
  ) {
    try {
      const { id } = user;

      const completeOnboardingResult =
        await this.userService.completeOnboarding(id, completeOnboardingDto);

      return completeOnboardingResult;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) userId: number) {
    try {
      const user = await this.userService.getUserById(userId);
      if (!user) {
        throw new Error(`User with id ${userId} not found`);
      }
      return user;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch()
  @UsePipes(ValidationPipe)
  async updateUser(
    @GetUser() user: User,
    @Body() updateUserDto: UpdateUserDto
  ) {
    try {
      const updatedUserResult = await this.userService.updateById(
        user.id,
        updateUserDto
      );
      return updatedUserResult;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) userId: number) {
    try {
      const deletedUser = await this.userService.deleteUser(userId);
      if (!deletedUser) {
        throw new Error('Problem at deleting');
      }
      return deletedUser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
