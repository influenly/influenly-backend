import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean
} from 'class-validator';

export class UpdateYoutubeTokenInfoDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  accessToken?: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsNumber()
  expireToken?: number;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  refreshToken?: string;
}
