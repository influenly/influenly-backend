import { IsNotEmpty, IsString, IsNumber, IsArray } from 'class-validator';

export class UpdateUserAndCreateAdvertiserDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsArray()
  contentType: string[];

  @IsNotEmpty()
  @IsString()
  userName: string;
}
