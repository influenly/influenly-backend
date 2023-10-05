import { DataSource, QueryRunner } from 'typeorm';
import { Credential, Integration } from 'src/entities';
import { YoutubeService } from 'src/libs/youtube/youtube.service';
import { CreateIntegrationDto } from './dto';
import { IntegrationRepository } from './integration.repository';
import { CredentialService } from './credential/credential.service';
import { NetworkService } from 'src/user/network/network.service';
import { AnalyticsService } from 'src/analytics/analytics.service';
export declare class IntegrationService {
    private readonly integrationRepository;
    private readonly networkService;
    private readonly analyticsService;
    private readonly credentialService;
    private readonly youtubeService;
    private readonly dataSource;
    constructor(integrationRepository: IntegrationRepository, networkService: NetworkService, analyticsService: AnalyticsService, credentialService: CredentialService, youtubeService: YoutubeService, dataSource: DataSource);
    getByUserId(userId: number, queryRunner?: QueryRunner): Promise<Integration[]>;
    getByNetworkId(networkId: number, queryRunner?: QueryRunner): Promise<Integration>;
    getCredentialByIntegrationId(integrationId: number, queryRunner?: QueryRunner): Promise<Credential>;
    createIntegration(userId: number, createIntegrationDto: CreateIntegrationDto): Promise<{
        error: boolean;
        networkIntegratedId: number;
        message: string;
    }>;
}
