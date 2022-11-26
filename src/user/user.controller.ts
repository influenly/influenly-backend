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
  Req,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto';
import { Auth } from 'src/auth/decorators';
import { UserTypes } from 'src/common/constants';

//TODO: Auth decorator should check user type.
@Auth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser(@Param('id', ParseIntPipe) userId: number) {
    try {
      const user = await this.userService.getUser(userId);
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
  async updateUser(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    try {
      const {
        user: { type: userType }
      } = req;

      const isCreator = userType === UserTypes.CREATOR;

      const { isOnboardingCompletion } = updateUserDto;

      let updatedUserResult;

      if (isOnboardingCompletion) {
        updatedUserResult = isCreator
          ? await this.userService.updateUserAndCreateCreator(updateUserDto)
          : this.userService.updateUserAndCreateAdvertiser(updateUserDto);
      } else {
        updatedUserResult = await this.userService.updateUser(updateUserDto);
      }

      if (!updatedUserResult) {
        throw new Error('Problem at updating');
      }

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
