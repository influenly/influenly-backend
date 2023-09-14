import { Injectable, Logger } from '@nestjs/common';
import { SignUpRequestDto } from 'src/auth/dto';
import { ProfileRepository } from './profile/profile.repository';
import { User } from 'src/entities';
import { DataSource } from 'typeorm';
import { UpdateUserDto } from './dto';
import { UserRepository } from './user.repository';
import { CompleteOnboardingDto } from './dto';
import { ICreateProfileInput } from './profile/interfaces/create-profile-input.interface';
import { ICreateUserInput } from './interfaces';
import { UserTypes } from 'src/common/constants';
import { IntegrationService } from 'src/integration/integration.service';
import { AnalyticsService } from 'src/analytics/analytics.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly analyticsService: AnalyticsService,
    private readonly integrationService: IntegrationService,
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

  async getProfile(id: number) {
    const [{ profile, country, type }, basicAnalytics] = await Promise.all([
      this.userRepository.findWithProfile(id),
      this.analyticsService.getBasicAnalyticsByUserId(id)
    ]);
    return { ...profile, country, type, basicAnalytics };
  }

  async createUser(signUpRequestDto: SignUpRequestDto): Promise<User> {
    try {
      const createUserInput: ICreateUserInput = {
        ...signUpRequestDto
      };

      const newUser = await this.userRepository.createAndSave(createUserInput);

      Logger.log(`User ${newUser?.id} created succesfully.`);

      delete newUser.password;
      return newUser;
    } catch (err) {
      Logger.error(`User creation has failed`);
      throw new Error(err.message);
    }
  }

  async updateById(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userRepository.updateById(id, updateUserDto);
    return updatedUser;
  }

  async completeOnboarding(
    { id, onboardingCompleted, type }: Partial<User>,
    completeOnboardingDto: CompleteOnboardingDto
  ) {
    if (onboardingCompleted)
      throw new Error('User has already completed the onboarding');

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { description, birthDate, username, contentTags, socialNetworks } =
        completeOnboardingDto;

      const isCreator = type === UserTypes.CREATOR;

      if (!birthDate && isCreator)
        throw new Error(
          'birthDate is required to complete the onboarding of a creator'
        );

      const createProfileInput: ICreateProfileInput = {
        userId: id,
        description,
        socialNetworks,
        username,
        contentTags,
        birthDate
      };

      const createdProfile = await this.profileRepository.createAndSave(
        createProfileInput,
        queryRunner
      );

      if (isCreator) {
        const integration = await this.integrationService.getByUserId(
          id,
          queryRunner
        );
        if (integration.length !== 1)
          throw new Error(
            `Problem getting creator integrations. Should be 1 but there are ${integration.length}`
          );
        const credential =
          await this.integrationService.getCredentialByIntegrationId(
            integration[0].id,
            queryRunner
          );
        const basicAnalytics = await this.analyticsService.createBasicAnalytics(
          integration[0].id,
          credential,
          queryRunner
        );
        console.log(basicAnalytics);
      }

      await this.userRepository.updateById(
        id,
        {
          onboardingCompleted: true
        },
        queryRunner
      );

      await queryRunner.commitTransaction();
      Logger.log(`User ${id} onboaring completed succesfully.`);

      return {
        ...createdProfile,
        type
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
