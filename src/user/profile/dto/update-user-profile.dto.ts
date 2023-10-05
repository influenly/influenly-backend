import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  IsDateString,
  IsISO8601,
  Length,
  IsObject
} from 'class-validator';
import { INetworks } from 'src/common/interfaces';

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
  @IsObject()
  networks?: INetworks;

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
