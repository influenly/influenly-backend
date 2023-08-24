import { Injectable, Logger } from '@nestjs/common';
import { SignUpRequestDto } from 'src/common/dto';
import { ProfileRepository } from './profile/profile.repository';
import { User } from 'src/entities';
import { DataSource } from 'typeorm';
import { UpdateUserDto } from './dto';
import { UserRepository } from './user.repository';
// import {  } from 'src/common/interfaces/profile';
import { UserTypes } from 'src/common/constants';
import { CompleteOnboardingDto } from './dto';
import { IUpdateCreatorInput } from 'src/common/interfaces/creator';
import { ICreateProfileInput } from './profile/interfaces/create-profile-input.interface';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly profileRepository: ProfileRepository,
    private readonly dataSource: DataSource
  ) {}

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findById(id);
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    //here is an example of whay error handle should be in service layer
    const user = await this.userRepository.findByEmail(email);
    return user;
  }

  async createUser(signUpRequestDto: SignUpRequestDto): Promise<User> {
    const newUser = this.userRepository.create(signUpRequestDto);
    await this.userRepository.save(newUser);
    delete newUser.password;
    return newUser;
  }

  async updateById(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userRepository.updateById(id, updateUserDto);
    return updatedUser;
  }

  async completeOnboarding(
    id: number,
    completeOnboardingDto: CompleteOnboardingDto
  ) {
    const user = await this.userRepository.findById(id);

    if (user.onboardingCompleted)
      throw new Error('User has already completed the onboarding');

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { description, birthDate, username, contentTags, socialNetworks } =
        completeOnboardingDto;
      const updatedUser = await this.userRepository.updateById(
        id,
        {
          onboardingCompleted: true
        },
        queryRunner
      );

      const isCreator = updatedUser.type === UserTypes.CREATOR;

      const creator = await this.profileRepository.createAndSave(
        id,
        queryRunner
      );
      if (!creator)
        throw new Error(`Creator not found with given user id ${id}`);

      // if (!creator.youtubeLinked)
      //   throw new Error(`Creator has not youtube linked`);

      if (!birthDate)
        throw new Error(
          'birthDate is required to complete the onboarding of a creator'
        );
      const createProfileInput: ICreateProfileInput = {
        description,
        socialNetworks,
        username,
        contentTags,
        birthDate
      };

      await queryRunner.commitTransaction();
      Logger.log(
        `User ${updatedUser?.id} updated onboaring completed succesfully.`
      );
      return {
        ...updatedUser
      };
    } catch (err) {
      Logger.error(`Onboarding completion transaction has failed.`);
      await queryRunner.rollbackTransaction();
      throw new Error(err.message);
    } finally {
      await queryRunner.release();
    }
  }

  async deleteUser(id: number): Promise<User> {
    const queryResult = await this.userRepository
      .createQueryBuilder()
      .delete()
      .where({
        id
      })
      .returning('*')
      .execute();

    return queryResult.raw[0];
  }
}
