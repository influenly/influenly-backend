import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  IsDateString,
  IsISO8601,
  Length
} from 'class-validator';

export class UpdateProfileDto {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  @IsISO8601({ strict: true })
  @Length(10, 10)
  birthDate?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  socialNetworks?: string[];

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  username?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  contentTags?: string[];
}
