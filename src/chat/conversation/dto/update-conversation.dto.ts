import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsNotEmpty } from 'class-validator';
import { ConversationTypes } from 'src/common/constants/enums';

const conversationTypes = Object.keys(ConversationTypes);

export class UpdateConversationDto {
  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsIn(conversationTypes)
  status: ConversationTypes;
}
