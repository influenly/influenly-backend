import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';

@Injectable()
export class YoutubeService {
  constructor(private readonly configService: ConfigService) {}
}
