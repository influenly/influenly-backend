import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Advertiser, Creator } from 'src/entities';
import {
  SignInRequestDto,
  SignUpAdvertiserRequestDto,
  SignUpCreatorRequestDto
} from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Advertiser)
    private readonly advertiserRepository: Repository<Advertiser>,
    @InjectRepository(Creator)
    private readonly creatorRepository: Repository<Creator>
  ) {}
  async signUpCreator(signUpCreatorDto: SignUpCreatorRequestDto) {
    try {
      const newCreator = this.creatorRepository.create({
        ...signUpCreatorDto,
        password: bcrypt.hashSync(signUpCreatorDto.password, 10)
      });
      await this.creatorRepository.save(newCreator);
      return newCreator;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async signUpAdvertiser(signUpAdvertiserDto: SignUpAdvertiserRequestDto) {
    try {
      const newAdvertsier = this.advertiserRepository.create({
        ...signUpAdvertiserDto,
        password: bcrypt.hashSync(signUpAdvertiserDto.password, 10)
      });
      await this.advertiserRepository.save(newAdvertsier);
      return newAdvertsier;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async signIn(signInRequestDto: SignInRequestDto) {
    return 'signIn';
  }
}
