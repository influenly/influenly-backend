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
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { YoutubeTokenInfoService } from './youtube-token-info.service';
import { CreateYoutubeTokenInfoDto, UpdateYoutubeTokenInfoDto } from './dto';

@ApiTags('youtubeTokenInfo')
@Controller('youtubeTokenInfo')
export class YoutubeTokenInfoController {
  constructor(
    private readonly youtubeTokenInfoService: YoutubeTokenInfoService
  ) {}

  @Get()
  async getAllYoutubeTokenInfo() {
    try {
      const youtubeTokenInfos =
        await this.youtubeTokenInfoService.getAllYoutubeTokenInfo();
      return youtubeTokenInfos;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async getYoutubeTokenInfo(
    @Param('id', ParseIntPipe) youtubeTokenInfoId: number
  ) {
    try {
      const youtubeTokenInfo =
        await this.youtubeTokenInfoService.getYoutubeTokenInfo(
          youtubeTokenInfoId
        );
      if (!youtubeTokenInfo) {
        throw new Error(
          `Youtube token info with id ${youtubeTokenInfoId} not found`
        );
      }
      return youtubeTokenInfo;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createYoutubeTokenInfo(
    @Body() createYoutubeTokenInfoDto: CreateYoutubeTokenInfoDto
  ) {
    try {
      const youtubeTokenInfo =
        await this.youtubeTokenInfoService.createYoutubeTokenInfo(
          createYoutubeTokenInfoDto
        );
      return youtubeTokenInfo;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch()
  @UsePipes(ValidationPipe)
  async updateYoutubeTokenInfo(
    @Body() updateYoutubeTokenInfoDto: UpdateYoutubeTokenInfoDto
  ) {
    try {
      const updatedYoutubeTokenInfo =
        await this.youtubeTokenInfoService.updateYoutubeTokenInfo(
          updateYoutubeTokenInfoDto
        );
      if (!updatedYoutubeTokenInfo) {
        throw new Error('Problem at updating');
      }
      return updatedYoutubeTokenInfo;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async deleteYoutubeTokenInfo(
    @Param('id', ParseIntPipe) youtubeTokenInfoId: number
  ) {
    try {
      const deletedYoutubeTokenInfo =
        await this.youtubeTokenInfoService.deleteYoutubeTokenInfo(
          youtubeTokenInfoId
        );
      if (!deletedYoutubeTokenInfo) {
        throw new Error('Problem at deleting');
      }
      return deletedYoutubeTokenInfo;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
