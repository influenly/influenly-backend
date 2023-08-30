import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Patch,
  Post
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from 'src/auth/decorators';
import { ConversationService } from './conversation.service';
import { UserTypes } from 'src/common/constants';
import { User } from 'src/entities';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';

@Auth({ type: UserTypes.ADVERTISER })
@ApiTags('conversation')
@Controller('conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post()
  async createConversation(
    @GetUser() user: User,
    @Body() createConversationDto: CreateConversationDto
  ) {
    try {
      const createdConversationResult =
        await this.conversationService.createConversation(
          createConversationDto
        );
      return createdConversationResult;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch()
  async updateConversation(
    @Body() updateConversationDto: UpdateConversationDto
  ) {
    try {
      const updatedConversationResult =
        await this.conversationService.updateById(
          updateConversationDto.id,
          updateConversationDto
        );
      return updatedConversationResult;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
