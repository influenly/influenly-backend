import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsString,
  IsOptional,
  IsDateString,
  IsISO8601,
  Length,
  IsObject,
  IsArray
} from 'class-validator';
import { INetworks } from 'src/common/interfaces';

export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  country?: string;

  @ApiPropertyOptional()
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

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  @IsObject()
  networks?: INetworks;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  username?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  contentTags?: string[];
}
