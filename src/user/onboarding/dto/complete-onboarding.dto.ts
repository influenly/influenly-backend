import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsDate
} from 'class-validator';

export class CompleteOnboardingDto {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  @IsDate()
  birthDate?: Date;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  userName: string;
}
