import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsDate,
  IsArray
} from 'class-validator';

export class UpdateUserAndCreateCreatorDto {
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

  @IsNotEmpty()
  @IsDate()
  birthDate: string;
}
