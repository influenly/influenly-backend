import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateUserAndCreateAdvertiser {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  userName: string;
}
