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
import { networksGenerator } from 'src/utils/generateNetworks';
import { Platforms } from 'src/common/constants/enums';
import { platform } from 'os';

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

        console.log(networksToDelete);

        if (networksToDelete.length) {
          await Promise.all(
            networksToDelete.map((network) =>
              this.networkService.deleteNetwork(network.id, queryRunner)
            )
          );
        }

        const userNetworksUrls = userNetworks.map((network) => network.url);

        const networksToCreateUrls = inputNetworksUrls.filter(
          (url) => !userNetworksUrls.includes(url)
        );

        const integratedNetwork = userNetworks.filter(
          (network) => network.integrated
        )[0];

        for (const platform in inputNetworks) {
          for (const url in inputNetworks[platform]) {
            if (networksToCreateUrls.includes(url)) {
              inputNetworks[platform];
            }
          }
        }
        const { youtube } = inputNetworks;

        const youtubeChannels = await Promise.all(
          youtube.map(async (url) => {
            const { valid, name, id } =
              await this.youtubeService.getChannelInfoFromUrl(url);
            return {
              url,
              valid,
              name,
              id
            };
          })
        );

        const validYoutubeChannels = youtubeChannels.filter(
          (youtubeChannel) => youtubeChannel.valid
        );

        const networksToCreate = {
          ...inputNetworks,
          youtube: validYoutubeChannels
        };

        const networks: Partial<Network>[] = networksGenerator(
          networksToCreate,
          userId
        );

        if (networks.length) {
          await this.networkService.create(networks, queryRunner);
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

      const integratedNetwork = await this.networkService.getById(
        networkIntegratedId
      );

      const networksToCreate = await Promise.all(
        networksInput.map(async (network) => {
          if (network.platform === Platforms.YOUTUBE) {
            const { valid, name, id, url } =
              await this.youtubeService.getChannelInfoFromUrl(network.url);
            return {
              userId: user.id,
              url,
              platform: Platforms.YOUTUBE,
              name,
              profileImg: 'default',
              valid,
              channelId: id
            };
          }
          return {
            userId: user.id,
            url: network.url,
            platform: Platforms[network.platform.toUpperCase()],
            name: network.url.split('.com/')[1],
            profileImg: 'default',
            valid: true
          };
        })
      );

      const newNetworks = networksToCreate.filter(
        (network) =>
          network.valid && integratedNetwork.channelId !== network.channelId
      );

      console.log(newNetworks);

      if (newNetworks.length) {
        await this.networkService.create(newNetworks, queryRunner);
      }

      await this.userRepository.updateById(
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

      const userUpdated = await this.userRepository.findById(user.id, true);

      Logger.log(`User ${user.id} onboaring completed succesfully.`);

      return userUpdated;
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
