import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Creator } from 'src/entities';
import { ICreateCreatorInput } from '../common/interfaces/creator';

@Injectable()
export class CreatorRepository extends Repository<Creator> {
  constructor(dataSource: DataSource) {
    super(Creator, dataSource.createEntityManager());
  }
  async createAndSave(
    createCreatorInput: ICreateCreatorInput
  ): Promise<Creator> {
    const newCreator = this.create(createCreatorInput);
    await this.save(newCreator);
    return newCreator;
  }
}
