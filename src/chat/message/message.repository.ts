import { DataSource, Repository, QueryRunner } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Message } from 'src/entities';
import { ICreateMessageInput } from './interfaces/create-message-input.interface';

@Injectable()
export class MessageRepository extends Repository<Message> {
  constructor(dataSource: DataSource) {
    super(Message, dataSource.createEntityManager());
  }
  async createAndSave(
    createMessageInput: ICreateMessageInput,
    queryRunner?: QueryRunner
  ): Promise<Message> {
    const newMessage = this.create(createMessageInput);
    const queryResult = await this.createQueryBuilder(
      'message-createAndSave',
      queryRunner
    )
      .insert()
      .values(newMessage)
      .returning('*')
      .execute();
    return queryResult.raw[0];
  }
}
