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
  Req,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../user.service';
import { CompleteOnboardingDto } from './dto';
import { Auth, GetUser } from 'src/auth/decorators';
import { Advertiser, Creator, User } from 'src/entities';
import { UserTypes } from 'src/common/constants';

//TODO: Auth decorator should check user type.
@Auth()
@ApiTags('user/onboarding')
@Controller('user/onboarding')
export class OnboardingController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async completeOnboarding(
    @GetUser() user: User,
    @Body() completeOnboardingDto: CompleteOnboardingDto
  ) {
    try {
      const { id, type } = user;
      const isCreator = type === UserTypes.CREATOR;

      const { description, userName, birthDate, contentType } =
        completeOnboardingDto;

      if (isCreator) {
        if (!birthDate)
          throw new Error('birthDate is required to create a new creator');
        const updateUserAndCreateCreatorResult =
          await this.userService.updateUserAndCreateCreator({
            id,
            description,
            userName,
            contentType,
            birthDate
          });
        return updateUserAndCreateCreatorResult;
      }
      const updateUserAndCreateAdvertiserResult =
        await this.userService.updateUserAndCreateAdvertiser({
          id,
          description,
          contentType,
          userName
        });
      return updateUserAndCreateAdvertiserResult;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
