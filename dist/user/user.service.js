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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const user_repository_1 = require("./user.repository");
const constants_1 = require("../common/constants");
const integration_service_1 = require("../integration/integration.service");
const analytics_service_1 = require("../analytics/analytics.service");
const network_service_1 = require("./network/network.service");
const youtube_service_1 = require("../libs/youtube/youtube.service");
const enums_1 = require("../common/constants/enums");
let UserService = class UserService {
    constructor(userRepository, networkService, analyticsService, integrationService, youtubeService, dataSource) {
        this.userRepository = userRepository;
        this.networkService = networkService;
        this.analyticsService = analyticsService;
        this.integrationService = integrationService;
        this.youtubeService = youtubeService;
        this.dataSource = dataSource;
    }
    async getUserById(id) {
        const user = await this.userRepository.findById(id);
        return user;
    }
    async getUserByEmail(email) {
        const user = await this.userRepository.findByEmail(email);
        return user;
    }
    async getProfile(id) {
        const [user, userNetworks] = await Promise.all([
            this.userRepository.findById(id),
            this.networkService.getByUserId(id)
        ]);
        const userNetworksWithBasicAnalytics = userNetworks.map(async (network) => {
            if (network.integrated) {
                const integration = await this.integrationService.getByNetworkId(network.id);
                const { totalSubs, totalVideos } = await this.analyticsService.getBasicAnalyticsByIntegrationId(integration.id);
                return Object.assign(Object.assign({}, network), { basicAnalytics: { totalSubs, totalVideos } });
            }
            return network;
        });
        return { user, networks: userNetworksWithBasicAnalytics };
    }
    async create(signUpRequestDto) {
        try {
            const createUserInput = Object.assign({}, signUpRequestDto);
            const newUser = await this.userRepository.createAndSave(createUserInput);
            common_1.Logger.log(`User ${newUser === null || newUser === void 0 ? void 0 : newUser.id} created succesfully.`);
            delete newUser.password;
            return newUser;
        }
        catch (err) {
            common_1.Logger.error(`User creation has failed`);
            throw new Error(err.message);
        }
    }
    async updateById(id, updateUserDto) {
        const updatedUser = await this.userRepository.updateById(id, updateUserDto);
        return updatedUser;
    }
    async completeOnboarding({ id, onboardingCompleted, type }, completeOnboardingDto) {
        if (onboardingCompleted)
            throw new Error('User has already completed the onboarding');
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const { description, birthDate, username, contentTags, networks: networksInput, networkIntegratedId } = completeOnboardingDto;
            const isCreator = type === constants_1.UserTypes.CREATOR;
            if (!birthDate && isCreator)
                throw new Error('birthDate is required to complete the onboarding of a creator');
            const integration = await this.integrationService.getByUserId(id);
            if (isCreator && integration.length !== 1) {
                throw new Error(`Problem getting creator integrations. Should be 1 but there are ${integration.length}`);
            }
            const integratedNetwork = await this.networkService.getById(networkIntegratedId);
            const { youtube } = networksInput;
            const youtubeChannelsInfo = await Promise.all(youtube.map((url) => this.youtubeService.getChannelInfoFromUrl(url)));
            const newYoutubeNetworksInfo = youtubeChannelsInfo
                .filter((channelInfo) => channelInfo.id != integratedNetwork.channelId)
                .map((channelInfo) => (Object.assign(Object.assign({}, channelInfo), { url: `https://www.youtube.com/channel/${channelInfo.id}`, userId: id, platform: enums_1.Platforms.YOUTUBE })));
            const nonIntegratedNetworks = Object.assign({}, networksInput);
            delete nonIntegratedNetworks.youtube;
            let newNetworksInfo;
            for (const [platformName, platformNetworks] of Object.entries(nonIntegratedNetworks)) {
                platformNetworks.forEach((url) => {
                    newNetworksInfo.push({
                        url,
                        profileImg: 'default',
                        name: url.split('.com/')[1],
                        platform: enums_1.Platforms[platformName.toUpperCase()],
                        userId: id
                    });
                });
            }
            const newNetworks = [...newYoutubeNetworksInfo, ...newNetworksInfo];
            const networksCreated = await this.networkService.create(newNetworks, queryRunner);
            const { totalSubs, totalVideos } = await this.analyticsService.getBasicAnalyticsByIntegrationId(integration[0].id, queryRunner);
            const integratedNetworkWithBasicAnalytics = Object.assign(Object.assign({}, integratedNetwork), { basicAnalytics: {
                    totalSubs,
                    totalVideos
                } });
            const networks = Object.assign(Object.assign({}, networksCreated), { integratedNetworkWithBasicAnalytics });
            const updatedUser = await this.userRepository.updateById(id, {
                description,
                username,
                contentTags,
                birthDate,
                onboardingCompleted: true
            }, queryRunner);
            await queryRunner.commitTransaction();
            common_1.Logger.log(`User ${id} onboaring completed succesfully.`);
            return {
                updatedUser,
                networks,
                type
            };
        }
        catch (err) {
            common_1.Logger.error(`Onboarding completion transaction has failed. Error: ${err}`);
            await queryRunner.rollbackTransaction();
            throw new Error(err.message);
        }
        finally {
            await queryRunner.release();
        }
    }
    async deleteUser(id) {
        const queryResult = await this.userRepository
            .createQueryBuilder()
            .delete()
            .where({
            id
        })
            .returning('*')
            .execute();
        return queryResult.raw[0];
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        network_service_1.NetworkService,
        analytics_service_1.AnalyticsService,
        integration_service_1.IntegrationService,
        youtube_service_1.YoutubeService,
        typeorm_1.DataSource])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map