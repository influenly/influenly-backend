import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateConversationDto {
  @IsNotEmpty()
  @IsNumber()
  advertiserUserId: number;

  @IsNotEmpty()
  @IsNumber()
  creatorUserId: number;

  @IsNotEmpty()
  @IsString()
  message: string;
}
