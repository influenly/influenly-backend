import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AdvertiserService } from './advertiser.service';

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
  createAdvertiser(): string {
    return this.advertiserService.createAdvertiser();
  }

  @Patch()
  updateAdvertiser(): string {
    return this.advertiserService.updateAdvertiser();
  }

  @Delete(':id')
  deleteAdvertiser(@Param() params): string {
    const advertiserId = params.id;
    return this.advertiserService.deleteAdvertiser(advertiserId);
  }
}
