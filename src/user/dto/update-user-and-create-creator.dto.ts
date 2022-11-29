import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsDate
} from 'class-validator';

export class UpdateUserAndCreateCreator {
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

  @IsOptional()
  @IsNotEmpty()
  @IsDate()
  birthDate: Date;
}
