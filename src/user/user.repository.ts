import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { Repository, DataSource } from 'typeorm';
import { IUpdateUserInput } from './interfaces';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    dataSource: DataSource
  ) {
    super(User, dataSource.manager);
  }

  async updateById(updateUserInput: IUpdateUserInput) {
    const queryResult = await this.userRepository
      .createQueryBuilder()
      .update(updateUserInput)
      .where({
        id: updateUserInput.id
      })
      .returning('*')
      .execute();

    return queryResult.raw[0];
  }
}
