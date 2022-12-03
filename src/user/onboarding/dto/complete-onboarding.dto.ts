import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  IsDateString,
  IsISO8601,
  Length,
  IsObject,
  ValidateNested
} from 'class-validator';
import { ISocialNetworks } from 'src/common/interfaces/advertiser/social-networks.interface';

class SocialNetworks implements ISocialNetworks {}
export class CompleteOnboardingDto {
  @ApiProperty()
  @IsOptional()
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

  @ApiPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => SocialNetworks)
  socialNetworks?: ISocialNetworks;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  userName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  contentType: string[];
}
