import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateConversationDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  status: string;
}
