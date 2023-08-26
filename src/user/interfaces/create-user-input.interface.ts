import { SignUpRequestDto } from 'src/common/dto';

export interface ICreateUserInput extends SignUpRequestDto {
  analyticsId: number;
}
