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
import { ProfileService } from './profile/profile.service';
import { UpdateProfileDto } from './profile/dto/update-profile.dto';

@Auth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly profileService: ProfileService
  ) {}

  @Post('/onboarding')
  @UsePipes(ValidationPipe)
  async completeOnboarding(
    @GetUser() user: User,
    @Body() completeOnboardingDto: CompleteOnboardingDto
  ) {
    try {
      const { id, onboardingCompleted, type } = user;

      const completeOnboardingResult =
        await this.userService.completeOnboarding(
          { id, onboardingCompleted, type },
          completeOnboardingDto
        );

      return completeOnboardingResult;
    } catch (error) {
      throw new HttpException(
        { error: true, message: error.message },
        HttpStatus.BAD_REQUEST
      );
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

  @Patch('/profile')
  @UsePipes(ValidationPipe)
  async updateUserProfile(
    @GetUser() user: User,
    @Body() updateProfileDto: UpdateProfileDto
  ) {
    try {
      const updatedProfileResult = await this.profileService.updateByUserId(
        user.id,
        updateProfileDto
      );
      return updatedProfileResult;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id/profile')
  async getUserProfile(
    @GetUser() { type, onboardingCompleted }: User,
    @Param('id', ParseIntPipe) userId: number
  ) {
    try {
      if (!onboardingCompleted)
        throw new Error(
          `User with id ${userId} has not completed the onboarding`
        );
      const profile = await this.profileService.getByUserId(userId);
      if (!profile) {
        throw new Error(`User with id ${userId} not found`);
      }
      return { ...profile, type };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
