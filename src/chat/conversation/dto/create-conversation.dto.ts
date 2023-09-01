import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateConversationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  advertiserUserId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  creatorUserId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  message: string;
}
