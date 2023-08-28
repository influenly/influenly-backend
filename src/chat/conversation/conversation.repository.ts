import { DataSource, Repository, QueryRunner } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Conversation } from 'src/entities';
import { ICreateConversationInput} from './interfaces/create-conversation-input.interface';

@Injectable()
export class ConversationRepository extends Repository<Conversation> {
  constructor(dataSource: DataSource) {
    super(Conversation, dataSource.createEntityManager());
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
}
