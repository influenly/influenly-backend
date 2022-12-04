import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsString,
  IsNumber
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTokenInfoDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  accessToken: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  expireToken: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  refreshToken: string;
}
