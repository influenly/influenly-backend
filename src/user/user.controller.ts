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
  Query,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CompleteOnboardingDto, UpdateUserDto } from './dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/entities';
import { FileInterceptor } from '@nestjs/platform-express';

@Auth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/profileimg')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() imgFile: Express.Multer.File) {
    const uploadingResult = await this.userService.uploadProfileImage(imgFile);
    return uploadingResult;
  }
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
        data: { user: completeOnboardingResult }
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
    @Query('content_tags') contentTags: string,
    @Query('order_by') orderBy: string
  ) {
    try {
      let minFollowers, maxFollowers, contentTagsArr;

      if (followersRange) {
        let [min, max] = followersRange.split('-');

        minFollowers = parseInt(min);
        maxFollowers = max === '*' ? Infinity : parseInt(max);
      }

      if (contentTags) {
        contentTagsArr = contentTags.split(';');
      }

      const filters = {
        followersRange: {
          minFollowers,
          maxFollowers
        },
        contentTagsArr
      };

      const creatorsResult = await this.userService.getCreators(
        filters,
        orderBy
      );

      return {
        ok: true,
        count: creatorsResult.length,
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
      console.log('hola');
      const user = await this.userService.getUserById(userId, true);
      if (!user) {
        throw new Error(`User with id ${userId} not found`);
      }
      return {
        ok: true,
        data: { user }
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
        data: { user: updatedUserResult }
      };
    } catch (error) {
      throw new HttpException(
        { ok: false, error: error.message },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
