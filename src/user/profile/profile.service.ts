import { Injectable } from '@nestjs/common';
import { ProfileRepository } from './profile.repository';
import { Profile } from 'src/entities';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly profileRepository: ProfileRepository) {}

  async getByUserId(id: number): Promise<Profile> {
    const profile = await this.profileRepository.findByUserId(id);
    return profile;
  }

  async updateByUserId(userId: number, updateProfileDto: UpdateProfileDto) {
    const updatedProfile = await this.profileRepository.updateByUserId(
      userId,
      updateProfileDto
    );
    return updatedProfile;
  }
}
