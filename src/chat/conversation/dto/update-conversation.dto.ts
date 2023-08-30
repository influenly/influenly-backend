import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateConversationDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  status: string;
}
