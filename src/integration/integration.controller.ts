import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from 'src/auth/decorators';
import { User } from 'src/entities';
import { CreateIntegrationDto } from './dto';
import { IntegrationService } from './integration.service';

@Auth()
@ApiTags('integration')
@Controller('integration')
export class IntegrationController {
  constructor(private readonly integrationService: IntegrationService) {}

  @Post()
  @UsePipes(ValidationPipe)
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
      return createdIntegrationResult;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
