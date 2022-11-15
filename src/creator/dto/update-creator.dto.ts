import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean
} from 'class-validator';

export class UpdateCreatorDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  firstName?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  lastName?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  userName?: string;

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
  @IsBoolean()
  youtubeLinked?: Boolean;

  @IsOptional()
  @IsNotEmpty()
  @IsBoolean()
  twitchLinked?: Boolean;
}
