import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsString,
  IsNumber,
  IsOptional
} from 'class-validator';

export class UpdateAdvertiserDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  username?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  country?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  profileImage?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  credits?: number;
}
