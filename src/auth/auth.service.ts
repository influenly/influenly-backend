import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Advertiser, Creator } from 'src/entities';
import { Repository } from 'typeorm';
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
    return 'signUpCreator';
  }

  async signUpAdvertiser(signUpAdvertiserDto: SignUpAdvertiserRequestDto) {
    return 'signUpAdvertiser';
  }

  async signIn(signInRequestDto: SignInRequestDto) {
    return 'signIn';
  }
}
