import { Injectable } from '@nestjs/common';
import { ProfileRepository } from './profile.repository';
import { Profile } from 'src/entities';
import { DataSource } from 'typeorm';
// import { ICreateProfileInput } from './profile/interfaces/create-profile-input.interface';

@Injectable()
export class ProfileService {
  constructor(
    private readonly profileRepository: ProfileRepository,
    private readonly dataSource: DataSource
  ) {}

  async getByUserId(id: number): Promise<Profile> {
    const profile = await this.profileRepository.findByUserId(id);
    return profile;
  }

  //   async updateById(id: number, updateUserDto: UpdateUserDto): Promise<User> {
  //     const updatedUser = await this.userRepository.updateById(id, updateUserDto);
  //     return updatedUser;
  //   }
}
