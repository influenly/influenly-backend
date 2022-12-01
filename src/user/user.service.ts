import { Injectable, Logger } from '@nestjs/common';
import { SignUpRequestDto } from 'src/common/dto';
import { CreatorRepository } from 'src/creator/creator.repository';
import { User } from 'src/entities';
import { DataSource } from 'typeorm';
import {
  UpdateUserDto,
  UpdateUserAndCreateCreatorDto,
  UpdateUserAndCreateAdvertiserDto
} from './dto';
import { IUpdateUserInput } from './interfaces';
import { UserRepository } from './user.repository';
import { ICreateAdvertiserInput } from 'src/common/interfaces/advertiser';
import { ICreateCreatorInput } from 'src/common/interfaces/creator';
import { AdvertiserRepository } from 'src/advertiser/advertiser.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly creatorRepository: CreatorRepository,
    private readonly advertiserRepository: AdvertiserRepository,
    private readonly dataSource: DataSource
  ) {}
  async getUsers(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async getUser(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id }
    });
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    //TODO: add argument to function to indicate which fields should be returned
    const user = await this.userRepository.findOne({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        type: true
      }
    });
    return user;
  }

  async createUser(signUpRequestDto: SignUpRequestDto): Promise<User> {
    const newUser = this.userRepository.create(signUpRequestDto);
    await this.userRepository.save(newUser);
    delete newUser.password;
    return newUser;
  }

  async updateById(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const updateUserInput: IUpdateUserInput = {
      id,
      ...updateUserDto
    };
    const updatedUser = await this.userRepository.updateById(updateUserInput);
    return updatedUser;
  }

  async updateUserAndCreateCreator(
    updateUserAndCreateCreator: UpdateUserAndCreateCreatorDto
  ) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { id, description, birthDate, userName, contentType } =
        updateUserAndCreateCreator;

      const updatedUser = await this.userRepository.updateById(
        {
          id,
          onboardingCompleted: true
        },
        queryRunner
      );

      Logger.log(
        `User ${updatedUser?.id} updated onboaring completed succesfully.`
      );

      const createCreatorInput: ICreateCreatorInput = {
        userId: updatedUser.id,
        description,
        userName,
        contentType,
        birthDate,
        youtubeLinked: true
      };
      const createdCreator = await this.creatorRepository.createAndSave(
        createCreatorInput,
        queryRunner
      );

      await queryRunner.commitTransaction();
      return createdCreator;
    } catch (err) {
      Logger.error(`Onboarding completion transaction has failed.`);
      await queryRunner.rollbackTransaction();
      throw new Error(err.message);
    } finally {
      await queryRunner.release();
    }
  }

  async updateUserAndCreateAdvertiser(
    updateUserAndCreateAdvertiser: UpdateUserAndCreateAdvertiserDto
  ) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { id, description, userName, contentType } =
        updateUserAndCreateAdvertiser;
      const updatedUser = await this.userRepository.updateById(
        {
          id
        },
        queryRunner
      );

      Logger.log(
        `User ${updatedUser?.id} updated onboaring completed succesfully.`
      );

      const createAdvertiserInput: ICreateAdvertiserInput = {
        userId: updatedUser.id,
        description,
        userName,
        contentType
      };
      const createdAdvertiser = await this.advertiserRepository.createAndSave(
        createAdvertiserInput,
        queryRunner
      );

      await queryRunner.commitTransaction();
      return createdAdvertiser;
    } catch (err) {
      Logger.error(`Onboarding completion transaction has failed.`);
      await queryRunner.rollbackTransaction();
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
