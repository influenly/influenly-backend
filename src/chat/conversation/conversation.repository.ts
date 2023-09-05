import { DataSource, Repository, QueryRunner } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Conversation } from 'src/entities';
import { ICreateConversationInput } from './interfaces/create-conversation-input.interface';
import { IUpdateConversationInput } from './interfaces/update-conversation-input.interface';

@Injectable()
export class ConversationRepository extends Repository<Conversation> {
  constructor(dataSource: DataSource) {
    super(Conversation, dataSource.createEntityManager());
  }

  async findByUserId(userId: number, field: string, queryRunner?: QueryRunner) {
    const userType = field.substring(0, field.length - 2);
    const queryResult = await this.createQueryBuilder('conversation')

      .leftJoinAndSelect(`conversation.${userType}`, 'user')
      .leftJoinAndSelect('user.profile', 'profile')
      .select([
        'conversation.id',
        'conversation.advertiserUserId',
        'conversation.creatorUserId',
        'conversation.status',
        'user.id',
        'profile.username',
        'profile.profileImg'
      ])
      .where(`conversation.${field} = :userId`, { userId })
      .getMany();

    console.log(queryResult);

    return queryResult;
  }

  async createAndSave(
    createConversationInput: ICreateConversationInput,
    queryRunner?: QueryRunner
  ): Promise<Conversation> {
    const newConversation = this.create(createConversationInput);
    const queryResult = await this.createQueryBuilder(
      'conversation-createAndSave',
      queryRunner
    )
      .insert()
      .values(newConversation)
      .returning('*')
      .execute();
    return queryResult.raw[0];
  }

  async updateById(
    id: number,
    updateConversationInput: IUpdateConversationInput,
    queryRunner?: QueryRunner
  ): Promise<Conversation> {
    console.log(updateConversationInput);
    const queryResult = await this.createQueryBuilder(
      'conversation-updateById',
      queryRunner
    )
      .update(updateConversationInput)
      .where({
        id
      })
      .returning('*')
      .execute();

    return queryResult.raw[0];
  }
}
