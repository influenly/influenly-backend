import { Injectable, Logger } from '@nestjs/common';
import { SignUpRequestDto } from 'src/auth/dto';
import { Network, User } from 'src/entities';
import { DataSource } from 'typeorm';
import { UserRepository } from './user.repository';
import { CompleteOnboardingDto } from './dto';
import { ICreateUserInput, IUpdateUserInput } from './interfaces';
import { UserTypes } from 'src/common/constants';
import { IntegrationService } from 'src/integration/integration.service';
import { AnalyticsService } from 'src/analytics/analytics.service';
import { NetworkService } from './network/network.service';
import { YoutubeService } from '../libs/youtube/youtube.service';
import {
  networksGenerator,
  youtubeNetworksGenerator
} from 'src/utils/generateNetworks';

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

  async getProfileByUserId(id: number) {
    const [user, userNetworks] = await Promise.all([
      this.userRepository.findById(id),
      this.networkService.getByUserId(id)
    ]);

    console.log('user', user);
    console.log('userNetworks', userNetworks);

    const userNetworksWithBasicAnalytics = await Promise.all(
      userNetworks.map(async (network) => {
        if (network.integrated) {
          const integration = await this.integrationService.getByNetworkId(
            network.id
          );
          console.log('integration', integration);
          const { totalSubs, totalVideos } =
            await this.analyticsService.getBasicAnalyticsByIntegrationId(
              integration.id
            );
          console.log('totalSubs', totalSubs);
          return {
            ...network,
            basicAnalytics: { totalSubs, totalVideos }
          };
        }
        return network;
      })
    );

    console.log(
      'userNetworksWithBasicAnalytics',
      userNetworksWithBasicAnalytics
    );

    return { user, networks: userNetworksWithBasicAnalytics };
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

  async updateById(user: User, updateUserDto: IUpdateUserInput) {
    const inputNetworks = updateUserDto.networks;

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    // If a user already have networks to update means that is not onboarding.
    const userNetworks = await this.networkService.getByUserId(user.id);

    if (inputNetworks) {
      const inputNetworksUrls = [].concat(...Object.values(inputNetworks));

      const networksToDelete = userNetworks.filter(
        (network) => !inputNetworksUrls.includes(network.url)
      );

      await Promise.all(
        networksToDelete.map((network) =>
          this.networkService.deleteNetwork(network.id, queryRunner)
        )
      );

      const userNetworksUrls = userNetworks.map((network) => network.url);

      const integratedNetwork = userNetworks.filter(
        (network) => network.integrated
      )[0];

      const { youtube } = inputNetworks;

      const youtubeChannelsInfo = await Promise.all(
        youtube.map((url) => this.youtubeService.getChannelInfoFromUrl(url))
      );

      const existingYoutubeChannelsInfo = youtubeChannelsInfo.filter(
        (c) => c !== 'NOT FOUND'
      );

      const newYoutubeNetworksInfo = youtubeNetworksGenerator(
        existingYoutubeChannelsInfo,
        integratedNetwork
      );

      const newNetworksInfo: Partial<Network>[] = networksGenerator(
        inputNetworks,
        user.id
      );

      const newNetworks = [
        ...newYoutubeNetworksInfo,
        ...newNetworksInfo
      ].filter((network) => !userNetworksUrls.includes(network.url));

      if (newNetworks.length) {
        await this.networkService.create(newNetworks, queryRunner);
      }
      delete updateUserDto['networks'];
    }
    const updatedUser = await this.userRepository.updateById(
      user.id,
      updateUserDto,
      queryRunner
    );

    return { user: updatedUser, networks: userNetworks };
  }

  async completeOnboarding(
    user: User,
    completeOnboardingDto: CompleteOnboardingDto
  ) {
    if (user.onboardingCompleted)
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
        networks: networksInput,
        networkIntegratedId
      } = completeOnboardingDto;

      const isCreator = user.type === UserTypes.CREATOR;

      if (isCreator) {
        if (!birthDate)
          throw new Error(
            'birthDate is required to complete the onboarding of a creator'
          );

        if (!networkIntegratedId)
          throw new Error(
            'networkIntegratedId is required to complete the onboarding of a creator'
          );
      }

      const integration = await this.integrationService.getByUserId(user.id);

      if (isCreator && integration.length !== 1) {
        throw new Error(
          `Problem getting creator integrations. Should be 1 but there are ${integration.length}`
        );
      }

      const integratedNetwork = await this.networkService.getById(
        networkIntegratedId
      );

      const { youtube } = networksInput;

      const youtubeChannelsInfo = await Promise.all(
        youtube.map((url) => this.youtubeService.getChannelInfoFromUrl(url))
      );

      const existingYoutubeChannelsInfo = youtubeChannelsInfo.filter(
        (c) => c !== 'NOT FOUND' && c.channelId != integratedNetwork.channelId
      );

      const newYoutubeNetworksInfo = youtubeNetworksGenerator(
        existingYoutubeChannelsInfo,
        integratedNetwork
      );

      const newNetworksInfo: Partial<Network>[] = networksGenerator(
        networksInput,
        user.id
      );

      const newNetworks = [...newYoutubeNetworksInfo, ...newNetworksInfo];

      if (newNetworks.length) {
        await this.networkService.create(newNetworks, queryRunner);
      }

      const { totalSubs, totalVideos } =
        await this.analyticsService.getBasicAnalyticsByIntegrationId(
          integration[0].id,
          queryRunner
        );

      const integratedNetworkWithBasicAnalytics = {
        ...integratedNetwork,
        basicAnalytics: {
          totalSubs,
          totalVideos
        }
      };

      const updatedUser = await this.userRepository.updateById(
        user.id,
        {
          description,
          username,
          contentTags,
          birthDate,
          onboardingCompleted: true
        },
        queryRunner
      );

      await queryRunner.commitTransaction();
      Logger.log(`User ${user.id} onboaring completed succesfully.`);

      newNetworks.push(integratedNetworkWithBasicAnalytics);

      return {
        updatedUser,
        networks: newNetworks
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
