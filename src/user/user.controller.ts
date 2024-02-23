import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CompleteOnboardingDto, UpdateUserDto } from './dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/entities';

// @Auth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/onboarding')
  async completeOnboarding(
    @GetUser() user: User,
    @Body() completeOnboardingDto: CompleteOnboardingDto
  ) {
    try {
      const completeOnboardingResult =
        await this.userService.completeOnboarding(user, completeOnboardingDto);

      return {
        ok: true,
        user: {
          ...completeOnboardingResult.updatedUser,
          networks: completeOnboardingResult.networks
        }
      };
    } catch (error) {
      throw new HttpException(
        { ok: false, error: error.message },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Get('/creator')
  async getCreators(
    @Query('followers_range') followersRange: string,
    @Query('content_tags') contentTags: string
  ) {
    try {
      let minFollowers, maxFollowers, contentTagsArr;

      if (followersRange) {
        let [min, max] = followersRange.split('-');

        minFollowers = parseInt(min);
        maxFollowers = max === '*' ? undefined : parseInt(max);
      }

      if (contentTags) {
        contentTagsArr = contentTags.split(';');
      }

      const filters = {
        minFollowers,
        maxFollowers,
        contentTagsArr
      };

      const creatorsResult = await this.userService.getCreators(filters);

      return {
        ok: true,
        data: creatorsResult
      };
    } catch (error) {
      throw new HttpException(
        { ok: false, error: error.message },
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
      return {
        ok: true,
        user
      };
    } catch (error) {
      throw new HttpException(
        { ok: false, error: error.message },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Patch()
  async updateUser(
    @GetUser() user: User,
    @Body() updateUserDto: UpdateUserDto
  ) {
    try {
      const updatedUserResult = await this.userService.updateById(
        user,
        updateUserDto
      );
      return {
        ok: true,
        user: {
          ...updatedUserResult.user,
          networks: updatedUserResult.networks
        }
      };
    } catch (error) {
      throw new HttpException(
        { ok: false, error: error.message },
        HttpStatus.BAD_REQUEST
      );
    }
  }

  // @Get(':id/profile')
  // async getUserProfile(
  //   @GetUser() { onboardingCompleted }: User,
  //   @Param('id', ParseIntPipe) userId: number
  // ) {
  //   try {
  //     if (!onboardingCompleted)
  //       throw new Error(
  //         `User with id ${userId} has not completed the onboarding`
  //       );
  //     const profileResult = await this.userService.getProfileByUserId(userId);
  //     if (!profileResult) {
  //       throw new Error(`User with id ${userId} not found`);
  //     }
  //     return {
  //       ok: true,
  //       user: {
  //         ...profileResult.user,
  //         networks: profileResult.networks
  //       }
  //     };
  //   } catch (error) {
  //     throw new HttpException(
  //       { ok: false, error: error.message },
  //       HttpStatus.BAD_REQUEST
  //     );
  //   }
  // }
}
