import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Creator } from 'src/entities';
import { UpdateCreatorDto } from './dto';
import { ICreateCreatorInput } from './interfaces';

@Injectable()
export class CreatorRepository extends Repository<Creator> {
  async createAndSave(
    createCreatorInput: ICreateCreatorInput
  ): Promise<Creator> {
    const newCreator = this.create(createCreatorInput);
    await this.save(newCreator);
    return newCreator;
  }

  async updateById(
    id: number,
    updateCreatorDto: UpdateCreatorDto
  ): Promise<Creator> {
    const queryResult = await this.createQueryBuilder()
      .update(updateCreatorDto)
      .where({
        id
      })
      .returning('*')
      .execute();

    return queryResult.raw[0];
  }
}
