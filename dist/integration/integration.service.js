"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const youtube_service_1 = require("../libs/youtube/youtube.service");
const integration_repository_1 = require("./integration.repository");
const credential_service_1 = require("./credential/credential.service");
const network_service_1 = require("../user/network/network.service");
const analytics_service_1 = require("../analytics/analytics.service");
const enums_1 = require("../common/constants/enums");
let IntegrationService = class IntegrationService {
    constructor(integrationRepository, networkService, analyticsService, credentialService, youtubeService, dataSource) {
        this.integrationRepository = integrationRepository;
        this.networkService = networkService;
        this.analyticsService = analyticsService;
        this.credentialService = credentialService;
        this.youtubeService = youtubeService;
        this.dataSource = dataSource;
    }
    async getByUserId(userId, queryRunner) {
        const integration = await this.integrationRepository.findByUserId(userId, queryRunner);
        return integration;
    }
    async getByNetworkId(networkId, queryRunner) {
        const integration = await this.integrationRepository.findByNetworkId(networkId, queryRunner);
        return integration;
    }
    async getCredentialByIntegrationId(integrationId, queryRunner) {
        const credential = await this.credentialService.getByIntegrationId(integrationId, queryRunner);
        return credential;
    }
    async createIntegration(userId, createIntegrationDto) {
        const { authorizationCode, platform } = createIntegrationDto;
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const { access_token: accessToken, expiry_date: expiryDate, id_token: idToken, scope, refresh_token: refreshToken } = await this.youtubeService.getToken(authorizationCode);
            if (scope.split(' ').length !== 2)
                throw new Error('Both permission should be accepted to create integration');
            const channelInfo = await this.youtubeService.getChannelInfo(accessToken);
            const userNetworks = await this.networkService.getByUserId(userId);
            const isIntegrated = (network) => network.integrated && network.channelId === channelInfo.id;
            if (userNetworks.some(isIntegrated)) {
                throw new Error('Network already integrated');
            }
            const newNetwork = await this.networkService.create({
                channelId: platform === enums_1.Platforms.YOUTUBE ? channelInfo.id : null,
                name: channelInfo.name,
                platform,
                integrated: true,
                profileImg: channelInfo.profileImg,
                url: `https://www.youtube.com/channel/${channelInfo.id}`,
                userId
            }, queryRunner);
            const networkId = newNetwork.id;
            const newIntegration = await this.integrationRepository.createAndSave({
                networkId,
                userId
            }, queryRunner);
            const integrationId = newIntegration.id;
            const { totalSubs, totalVideos } = channelInfo;
            await this.analyticsService.createBA({
                integrationId,
                totalSubs: parseInt(totalSubs),
                totalVideos: parseInt(totalVideos)
            }, queryRunner);
            const newCredential = await this.credentialService.create({
                integrationId,
                accessToken,
                expiryDate,
                idToken,
                scope,
                refreshToken
            }, queryRunner);
            await queryRunner.commitTransaction();
            common_1.Logger.log(`Integration id: ${newIntegration.id} and Credential id: ${newCredential.id} created successfully`);
            return newIntegration;
        }
        catch (err) {
            common_1.Logger.error(`Integration creation transaction has failed.`);
            await queryRunner.rollbackTransaction();
            throw new Error(err.message);
        }
        finally {
            await queryRunner.release();
        }
    }
};
IntegrationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [integration_repository_1.IntegrationRepository,
        network_service_1.NetworkService,
        analytics_service_1.AnalyticsService,
        credential_service_1.CredentialService,
        youtube_service_1.YoutubeService,
        typeorm_1.DataSource])
], IntegrationService);
exports.IntegrationService = IntegrationService;
//# sourceMappingURL=integration.service.js.map