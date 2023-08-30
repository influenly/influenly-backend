import { IsNotEmpty, IsNumber } from 'class-validator';


export class CreateConversationDto {
  @IsNotEmpty()
  @IsNumber()
  advertiserUserId: number;

  @IsNotEmpty()
  @IsNumber()
  creatorUserId: number;
}
