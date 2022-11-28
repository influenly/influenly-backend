import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpRequestDto } from 'src/common/dto';
import { CreatorRepository } from 'src/creator/creator.repository';
import { Creator, User } from 'src/entities';
import { Repository, DataSource } from 'typeorm';
import { UpdateUserDto } from './dto';
import { IUpdateUserInput } from './interfaces';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    // @InjectRepository(User)
    // private readonly userRepository: Repository<User>,
    private readonly userRepository: UserRepository,
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

  async updateUser(updateUserDto: UpdateUserDto): Promise<User> {
    const queryResult = await this.userRepository
      .createQueryBuilder()
      .update(updateUserDto)
      .where({
        id: updateUserDto.id
      })
      .returning('*')
      .execute();

    return queryResult.raw[0];
  }

  async updateUserAndCreateCreator(updateUserDto: UpdateUserDto) {
    const transactionResult = await this.dataSource.transaction(
      async (entityManager) => {
        try {
          // const queryRunner = entityManager.queryRunner;
          const userRepository = entityManager.withRepository(
            this.userRepository
          );
          // const customCreatorRepository = entityManager.withRepository(
          //   this.customCreatorRepository
          // );

          const updateUserInput: IUpdateUserInput = {
            id: updateUserDto.id,
            onboardingCompleted: true
          };

          const updatedUser = await userRepository.updateById(updateUserInput);
          console.log(updatedUser);

          // await this.userRepository.createAndSave({
          //   userId: updatedUser.id,
          //   description: 'asdsadsadasdsaas',
          //   youtubeLinked: true,
          //   userName: 'asdasd'
          // });
          console.log(2);
        } catch (error) {
          console.log(error);
        }
      }
    );
    console.log(transactionResult);
  }

  async updateUserAndCreater(updateUserDto: UpdateUserDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
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
