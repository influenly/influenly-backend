import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from 'src/auth/decorators';
import { UserTypes } from 'src/common/constants';
import { User } from 'src/entities';
import { CreateConversationDto } from './conversation/dto/create-conversation.dto';
import { UpdateConversationDto } from './conversation/dto/update-conversation.dto';
import { ChatService } from './chat.service';

@Auth()
@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('/conversation')
  async getConversationsByUserId(@GetUser() { id, type }: User) {
    try {
      const conversationsResult =
        await this.chatService.getConversationsByUserId(id, type);
      return conversationsResult;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/conversation/:id/message')
  async getMessagesByConversationId(
    @Param('id', ParseIntPipe) conversationId: number
  ) {
    try {
      const messagesResult = await this.chatService.getMessagesByConversationId(
        conversationId
      );
      return messagesResult;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Auth({ type: UserTypes.ADVERTISER })
  @Post('/conversation')
  async createConversation(
    @Body() createConversationDto: CreateConversationDto
  ) {
    try {
      const createdConversationResult =
        await this.chatService.createConversation(createConversationDto);
      return createdConversationResult;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch('/conversation')
  async updateConversation(
    @Body() updateConversationDto: UpdateConversationDto
  ) {
    try {
      const updatedConversationResult = await this.chatService.updateById(
        updateConversationDto
      );
      return updatedConversationResult;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
