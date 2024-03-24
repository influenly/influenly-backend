import { Injectable, Logger } from '@nestjs/common';
import { SignUpRequestDto } from 'src/auth/dto';
import { User } from 'src/entities';
import { DataSource, QueryRunner } from 'typeorm';
import { UserRepository } from './user.repository';
import { CompleteOnboardingDto } from './dto';
import { ICreateUserInput, IUpdateUserInput } from './interfaces';
import { UserTypes } from 'src/common/constants';
import { NetworkService } from './network/network.service';
import { YoutubeService } from '../libs/youtube/youtube.service';
import { AWSService } from '../libs/aws/aws.service';
import { Platforms } from 'src/common/constants/enums';
import { INetworkInput } from 'src/common/interfaces';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly networkService: NetworkService,
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
    const user = await this.userRepository.findByEmail(email, true);
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

  async updateById(user: User, updateUserDto: IUpdateUserInput) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const networksInput = updateUserDto.networks;

      const isCreator = user.type === UserTypes.CREATOR;

      // If a user already has networks to update it means that is not onboarding.
      const userNetworks = await this.networkService.getByUserId(user.id);

      if (networksInput?.length) {
        const networksInputUrls = networksInput.map((network) => network.url);

        const networksToDelete = userNetworks.filter(
          (network) => !networksInputUrls.includes(network.url)
        );

        if (networksToDelete.length) {
          await Promise.all(
            networksToDelete.map((network) =>
              this.networkService.deleteNetwork(network.id, queryRunner)
            )
          );
        }

        const userNetworksUrls = userNetworks.map((network) => network.url);

        const networksInputToCreate = networksInput.filter(
          (network) => !userNetworksUrls.includes(network.url)
        );

        const networksToCreate = await this.populateNetworksInfo(
          networksInputToCreate,
          user.id
        );

        const integratedNetwork = isCreator
          ? userNetworks.filter((network) => network.integrated)[0]
          : null;

        const validNetworks = networksToCreate.filter(
          (network) => network.valid
        );

        const newNetworks = isCreator
          ? validNetworks.filter(
              (network) => integratedNetwork.channelId !== network.channelId
            )
          : validNetworks;

        if (newNetworks.length) {
          await this.networkService.create(newNetworks, queryRunner);
        }
        delete updateUserDto['networks'];
      }

      await this.userRepository.updateById(user.id, updateUserDto, queryRunner);

      await queryRunner.commitTransaction();

      const updatedUser = await this.userRepository.findById(user.id, true);
      return updatedUser;
    } catch (err) {
      console.log('err', err);
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

      const integratedNetwork = isCreator
        ? await this.networkService.getById(networkIntegratedId)
        : null;

      const networksToCreate = await this.populateNetworksInfo(
        networksInput,
        user.id
      );

      const validNetworks = networksToCreate.filter((network) => network.valid);

      const newNetworks = isCreator
        ? validNetworks.filter(
            (network) => integratedNetwork.channelId !== network.channelId
          )
        : validNetworks;

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

  private async populateNetworksInfo(
    networks: INetworkInput[],
    userId: number
  ) {
    const networksPopulated = await Promise.all(
      networks.map(async (network) => {
        if (network.platform === Platforms.YOUTUBE) {
          const { valid, name, id, url } =
            await this.youtubeService.getChannelInfoFromUrl(network.url);
          return {
            userId,
            url,
            platform: Platforms.YOUTUBE,
            name,
            profileImg: 'default',
            valid,
            channelId: id
          };
        }
        return {
          userId,
          url: network.url,
          platform: Platforms[network.platform.toUpperCase()],
          name: network.url.split('.com/')[1],
          profileImg: 'default',
          valid: true
        };
      })
    );
    return networksPopulated;
  }
}
