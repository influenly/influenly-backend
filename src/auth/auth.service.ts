import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';
import { UserRepository } from 'src/user/user.repository';
import { SignInRequestDto, SignUpRequestDto } from '../common/dto';
import { IJwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwService: JwtService,
    private readonly dataSource: DataSource
  ) {}
  async signUp(signUpRequestDto: SignUpRequestDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { type, password } = signUpRequestDto;
      const hashedPassword = bcrypt.hashSync(password, 10);
      //TODO: DO NOT MUTATE INPUT VARIABLE. FUNCTIONAL PROGRAMMING
      signUpRequestDto = { ...signUpRequestDto, password: hashedPassword };

      const newUser = await this.userRepository.createAndSave(
        signUpRequestDto,
        queryRunner
      );
      const { id: newUserId } = newUser;

      const token = this.getJwtToken({ id: newUserId, userType: type });
      return {
        ...newUser,
        token
      };
    } catch (error) {
      Logger.error(`User signup transaction has failed.`);
      await queryRunner.rollbackTransaction();
      throw new Error(error.message);
    } finally {
      await queryRunner.release();
    }
  }

  async signIn(signInRequestDto: SignInRequestDto) {
    try {
      const { email, password } = signInRequestDto;

      const user = await this.userRepository.findByEmail(email);

      if (!user) {
        throw new Error('Credentials are not valid (email)');
      }

      if (!bcrypt.compareSync(password, user.password)) {
        throw new Error('Credentials are not valid (password)');
      }

      const { type, id } = user;
      const token = this.getJwtToken({ id, userType: type });

      delete user.password;
      return {
        ...user,
        token
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  private getJwtToken(payload: IJwtPayload): string {
    return this.jwService.sign(payload);
  }
}
