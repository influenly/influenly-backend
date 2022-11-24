import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AdvertiserService } from 'src/advertiser/advertiser.service';
import { CreatorService } from 'src/creator/creator.service';
import { SignInRequestDto, SignUpRequestDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly creatorService: CreatorService,
    private readonly advertiserService: AdvertiserService
  ) {}
  // async signUp(signUpRequestDto: SignUpRequestDto) {
  //   try {
  //     const { userType, password } = signUpRequestDto;
  //     const hashedPassword = bcrypt.hashSync(password, 10);
  //     //TODO: DO NOT MUTATE INPUT VARIABLE. FUNCTIONAL PROGRAMMING
  //     signUpRequestDto = { ...signUpRequestDto, password: hashedPassword };

  //     if (userType === 'CREATOR') {
  //       const newCreatorResult = await this.creatorService.createCreator(
  //         signUpRequestDto
  //       );
  //       return newCreatorResult;
  //     }
  //     if (userType === 'ADVERTISER') {
  //       const newAdvertiserResult =
  //         await this.advertiserService.createAdvertiser(signUpRequestDto);
  //       return newAdvertiserResult;
  //     }
  //     throw new Error(`Invalid user type (userType) with value: ${userType}`);
  //   } catch (error) {
  //     throw new Error(error.message);
  //   }
  // }

  // async signIn(signInRequestDto: SignInRequestDto) {
  //   try {
  //     const { email, password } = signInRequestDto;

  //     const [creator, advertiser] = await Promise.all([
  //       this.creatorService.getCreatorByEmail(email),
  //       this.advertiserService.getAdvertiserByEmail(email)
  //     ]);

  //     if (!creator && !advertiser) {
  //       throw new Error('Credentials are not valid (email)');
  //     }

  //     const user = creator || advertiser;

  //     if (!bcrypt.compareSync(password, user.password)) {
  //       throw new Error('Credentials are not valid (password)');
  //     }

  //     return user;
  //   } catch (error) {
  //     throw new Error(error.message);
  //   }
  // }
}
