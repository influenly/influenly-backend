import {
  IsNotEmpty,
  IsString,
  IsIn,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Platform } from 'src/common/constants/types/platform.type';
import { Platforms } from 'src/common/constants/enums';

const platforms = Object.keys(Platforms);

export class CreateIntegrationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  authorizationCode: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsIn(platforms)
  platform: Platform;
}
