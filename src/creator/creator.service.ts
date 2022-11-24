import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpRequestDto } from 'src/auth/dto';
import { Creator } from 'src/entities';
import { Repository } from 'typeorm';
import { UpdateCreatorDto } from './dto';

@Injectable()
export class CreatorService {
  constructor(
    @InjectRepository(Creator)
    private readonly creatorRepository: Repository<Creator>
  ) {}
  async getCreators(): Promise<Creator[]> {
    const creators = await this.creatorRepository.find();
    return creators;
  }

  async getCreator(id: number): Promise<Creator> {
    const creator = await this.creatorRepository.findOne({
      where: { id }
    });
    return creator;
  }

  async createCreator(signUpRequestDto: SignUpRequestDto): Promise<Creator> {
    const newCreator = this.creatorRepository.create(signUpRequestDto);
    await this.creatorRepository.save(newCreator);
    return newCreator;
  }

  async updateCreator(updateCreatorDto: UpdateCreatorDto): Promise<Creator> {
    const queryResult = await this.creatorRepository
      .createQueryBuilder()
      .update(updateCreatorDto)
      .where({
        id: updateCreatorDto.id
      })
      .returning('*')
      .execute();

    return queryResult.raw[0];
  }

  async deleteCreator(id: number): Promise<Creator> {
    const queryResult = await this.creatorRepository
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
