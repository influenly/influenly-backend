import { Injectable } from '@nestjs/common';
import { User } from 'src/entities';
import { Repository, DataSource } from 'typeorm';
import { IUpdateUserInput } from './interfaces';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async updateById(updateUserInput: IUpdateUserInput) {
    const queryResult = await this.createQueryBuilder()
      .update(updateUserInput)
      .where({
        id: updateUserInput.id
      })
      .returning('*')
      .execute();

    return queryResult.raw[0];
  }
}
