import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from 'src/auth/decorators';
import { UserTypes } from 'src/common/constants';
import { User } from 'src/entities';
import { CreateIntegrationDto } from './dto';
import { IntegrationService } from './integration.service';

@Auth({ type: UserTypes.CREATOR })
@ApiTags('integration')
@Controller('integration')
export class IntegrationController {
  constructor(private readonly integrationService: IntegrationService) {}

  @Post()
  async createIntegration(
    @GetUser() user: User,
    @Body() createIntegrationDto: CreateIntegrationDto
  ) {
    try {
      const createdIntegrationResult =
        await this.integrationService.createIntegration(
          user.id,
          createIntegrationDto
        );
      return {
        ok: true,
        integration: createdIntegrationResult
      };
    } catch (error) {
      throw new HttpException(
        { ok: false, error: error.message },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
