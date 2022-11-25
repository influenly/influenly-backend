import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpRequestDto } from 'src/common/dto';
import { User } from 'src/entities';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
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

  async deleteCreator(id: number): Promise<User> {
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