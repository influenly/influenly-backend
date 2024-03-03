import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Req
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('echo')
@Controller('echo')
export class EchoController {
  constructor() {}

  @Get()
  async echo(@Req() req) {
    try {
    return req.cookies
    } catch (error) {
      throw new HttpException(
        { ok: false, error: error.message },
        HttpStatus.BAD_REQUEST
      );
    }
  }
}
