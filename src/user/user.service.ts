import { Injectable, Logger } from '@nestjs/common';
import { SignUpRequestDto } from 'src/auth/dto';
import { User } from 'src/entities';
import { DataSource } from 'typeorm';
import { UpdateUserDto } from './dto';
import { UserRepository } from './user.repository';
import { CompleteOnboardingDto } from './dto';
import { ICreateUserInput } from './interfaces';
import { UserTypes } from 'src/common/constants';
import { IntegrationService } from 'src/integration/integration.service';
import { AnalyticsService } from 'src/analytics/analytics.service';
import { NetworkService } from './network/network.service';
import { IUpdateUserProfileInput } from './profile/interfaces/update-user-profile-input.interface';
import { YoutubeService } from '../libs/youtube/youtube.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly networkService: NetworkService,
    private readonly analyticsService: AnalyticsService,
    private readonly integrationService: IntegrationService,
    private readonly youtubeService: YoutubeService,
    private readonly dataSource: DataSource
  ) {}

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findById(id);
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    return user;
  }

  async getProfile(id: number) {
    const [user, userNetworks, basicAnalytics] = await Promise.all([
      this.userRepository.findById(id),
      this.networkService.getByUserId(id),
      this.analyticsService.getBasicAnalyticsByUserId(id)
    ]);
    return { user, userNetworks, basicAnalytics };
  }

  async create(signUpRequestDto: SignUpRequestDto): Promise<User> {
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
      const {
        description,
        birthDate,
        username,
        contentTags,
        socialNetworks,
        networkIntegratedId
      } = completeOnboardingDto;

      const isCreator = type === UserTypes.CREATOR;

      if (!birthDate && isCreator)
        throw new Error(
          'birthDate is required to complete the onboarding of a creator'
        );

      const { channelId: integratedChannelId } =
        await this.networkService.getById(networkIntegratedId);

      const { youtube } = socialNetworks;

      const youtubeChannelsInfo = await Promise.all(
        youtube.map((url) => this.youtubeService.getChannelInfoFromUrl(url))
      );

      const newYoutubeNetworksInfo = youtubeChannelsInfo
        .filter((channelInfo) => channelInfo.id != integratedChannelId)
        .map((channelInfo) => ({
          ...channelInfo,
          url: `https://www.youtube.com/channel/${channelInfo.id}`,
          userId: id
        }));

      const newNetworks = [...newYoutubeNetworksInfo];

      const networksCreated = await this.networkService.create(
        newNetworks,
        queryRunner
      );

      console.log(networksCreated);

      const updateUserProfileInput: IUpdateUserProfileInput = {
        description,
        username,
        contentTags,
        birthDate
      };

      const updatedUser = await this.userRepository.updateProfileById(
        id,
        updateUserProfileInput,
        queryRunner
      );

      if (isCreator) {
        const integration = await this.integrationService.getByUserId(id);
        if (integration.length !== 1)
          throw new Error(
            `Problem getting creator integrations. Should be 1 but there are ${integration.length}`
          );
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
        updatedUser,
        type
      };
    } catch (err) {
      Logger.error(
        `Onboarding completion transaction has failed. Error: ${err}`
      );
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
