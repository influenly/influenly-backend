import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { AdvertiserService } from './advertiser.service';
import { CreateAdvertiserDto, UpdateAdvertiserDto } from './dto';

@Controller('advertiser')
export class AdvertiserController {
  constructor(private readonly advertiserService: AdvertiserService) {}

  @Get()
  getAdvertisers(): string {
    return this.advertiserService.getAdvertisers();
  }

  @Get(':id')
  getAdvertiser(@Param() params): string {
    const advertiserId = params.id;
    return this.advertiserService.getAdvertiser(advertiserId);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createAdvertiser(@Body() createAdvertiserDto: CreateAdvertiserDto) {
    try {
      const advertiser = await this.advertiserService.createAdvertiser(
        createAdvertiserDto
      );
      return advertiser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch()
  @UsePipes(ValidationPipe)
  async updateAdvertiser(@Body() updateAdvertiserDto: UpdateAdvertiserDto) {
    try {
      const updatedAdvertiser = await this.advertiserService.updateAdvertiser(
        updateAdvertiserDto
      );
      if (!updatedAdvertiser) {
        throw new Error('Problem at updating');
      }
      return updatedAdvertiser;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  deleteAdvertiser(@Param() params): string {
    const advertiserId = params.id;
    return this.advertiserService.deleteAdvertiser(advertiserId);
  }
}
