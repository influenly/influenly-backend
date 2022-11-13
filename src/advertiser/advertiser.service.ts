import { Injectable } from '@nestjs/common';

@Injectable()
export class AdvertiserService {
  getAdvertisers(): string {
    return 'Get advertisers!';
  }

  getAdvertiser(id: string): string {
    return `Get advertiser with id ${id}!`;
  }

  createAdvertiser(): string {
    return 'Create Advertiser!';
  }

  updateAdvertiser(): string {
    return 'Update Advertiser!';
  }

  deleteAdvertiser(id: string): string {
    return `Delete advertiser with id ${id}!`;
  }
}
