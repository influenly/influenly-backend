import { IsNotEmpty, IsString, IsIn } from 'class-validator';
import { MessageTypes } from 'src/common/constants/enums';
import { MessageType } from 'src/common/constants/types';

const messageTypes = Object.keys(MessageTypes);

export class SendMessageEventDto {
  @IsNotEmpty()
  @IsString()
  conversationId: string;

  @IsNotEmpty()
  @IsString()
  receiverUserId: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(messageTypes)
  type: MessageType;
}
