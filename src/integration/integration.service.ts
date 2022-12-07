import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Integration } from 'src/entities';
import { GoogleOAuth2Service } from 'src/libs/google/oauth2';
import { Repository } from 'typeorm';
import { CreateIntegrationDto } from './dto';

@Injectable()
export class IntegrationService {
  constructor(
    @InjectRepository(Integration)
    private readonly integrationRepository: Repository<Integration>,
    private readonly googleOAuth2Service: GoogleOAuth2Service
  ) {}

  async getIntegration(id: number): Promise<Integration> {
    const integration = await this.integrationRepository.findOne({
      where: { id }
    });
    return integration;
  }

  async createIntegration(
    userId: number,
    createTokenInfoDto: CreateIntegrationDto
  ) {
    console.log(this.googleOAuth2Service.getToken);
    //get token from google lib
    // const token = this.googleOAuth2Service.getToken(
    //   createTokenInfoDto.authorizationCode
    // );
    //analyze token response and build input
    //const integrationInput = {
    //...token
    // };
    //create analytics ( empty )
    //create integration
    // const newIntegration =
    //   this.integrationRepository.create(createTokenInfoDto);
    // await this.integrationRepository.save(newIntegration);
    // return newIntegration;

    return 1;
  }
}
