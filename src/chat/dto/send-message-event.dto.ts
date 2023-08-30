import { IsNotEmpty, IsString, IsIn, IsNumber } from 'class-validator';
import { MessageTypes } from 'src/common/constants/enums';
import { MessageType } from 'src/common/constants/types';

const messageTypes = Object.keys(MessageTypes);

export class SendMessageEventDto {
  @IsNotEmpty()
  @IsNumber()
  conversationId: number;

  @IsNotEmpty()
  @IsNumber()
  receiverUserId: number;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(messageTypes)
  type: MessageType;
}
