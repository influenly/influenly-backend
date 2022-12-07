import { IsNotEmpty, MinLength, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateIntegrationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  authorizationCode: string;
}
