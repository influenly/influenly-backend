import { Inject, Injectable, Logger, forwardRef } from '@nestjs/common';
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
import { AWSService } from '../libs/aws/aws.service';
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
    @Inject(forwardRef(() => IntegrationService))
    private readonly integrationService: IntegrationService,
    private readonly youtubeService: YoutubeService,
    private readonly awsService: AWSService,
    private readonly dataSource: DataSource
  ) {}

  async uploadProfileImage(file: Express.Multer.File) {
    console.log(file);
    const s3UploadResult = await this.awsService.uploadToS3(file, 'bucketasd');
    return s3UploadResult;
  }
  async getUserById(id: number, withNetworksInfo: Boolean): Promise<User> {
    const user = await this.userRepository.findById(id, withNetworksInfo);
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    return user;
  }

  /*
   DISCOVERY ORIENTED ! ! !
   Obtenemos los creadores aplicando filtros y ordenamientos, solo tenemos en cuenta redes integradas.
  */
  async getCreators({ followersRange, contentTagsArr }, orderBy) {
    if (contentTagsArr?.length) {
    }
    const userCreators = await this.userRepository.findAllCreators(
      {
        followersRange: {
          active: Boolean(followersRange.maxFollowers),
          value: {
            minFollowers: followersRange.minFollowers,
            maxFollowers: followersRange.maxFollowers
          }
        },
        contentTags: {
          active: Boolean(contentTagsArr?.length),
          value: contentTagsArr
        },
        integrated: {
          active: true,
          value: true
        }
      },
      orderBy === 'relevance' ? 'ORDER_BY_RELEVANCE' : 'ORDER_BY_FOLLOWERS'
    );

    return userCreators;
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

  async updateById(userId: number, updateUserDto: IUpdateUserInput) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const inputNetworks = updateUserDto.networks;

      // If a user already has networks to update it means that is not onboarding.
      const userNetworks = await this.networkService.getByUserId(userId);

      if (inputNetworks && Object.keys(inputNetworks).length) {
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
          userId
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
      await this.userRepository.updateById(userId, updateUserDto, queryRunner);

      await queryRunner.commitTransaction();

      const updatedUser = await this.userRepository.findById(userId, true);

      return updatedUser;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new Error(err.message);
    } finally {
      await queryRunner.release();
    }
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

      const integratedNetwork = await this.networkService.getById(
        networkIntegratedId
      );

      const { youtube } = networksInput;

      const youtubeChannelsInfo = await Promise.all(
        youtube.map((url) => this.youtubeService.getChannelInfoFromUrl(url))
      );

      const existingYoutubeChannelsInfo = youtubeChannelsInfo.filter(
        (channel) =>
          channel !== 'NOT FOUND' && channel.id != integratedNetwork.channelId
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
        await this.analyticsService.getBAByIntegrationId(
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
        ...updatedUser,
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
