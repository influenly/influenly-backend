import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  IsDateString,
  IsISO8601,
  Length,
  IsNumber,
  IsObject
} from 'class-validator';
import { INetworks } from 'src/common/interfaces';

export class CompleteOnboardingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  @IsDateString()
  @IsISO8601({ strict: true })
  @Length(10, 10)
  birthDate?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsObject()
  networks: INetworks;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  networkIntegratedId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  contentTags: string[];
}
